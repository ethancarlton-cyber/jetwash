// JetWash — /quote form handler
// Owns the #quoteForm on /quote. Submits via AJAX to Web3Forms, shows an
// in-page success state, and fires PostHog tracking — the same behaviour
// lead-capture.js gives the lightweight forms, but with a single combined
// "Phone OR email" contact field (at least one valid contact required, not both).
//
// The form carries data-jw-lead-capture-bound="1" so lead-capture.js skips it
// and this handler is the sole owner — no double submit.

(function () {
    'use strict';

    // ---- validation helpers ------------------------------------------------
    // Permissive email: local@domain.tld — not over-strict, just sane shape.
    var emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

    function escapeHtml(s) {
        return String(s).replace(/[&<>"'\/]/g, function (c) {
            return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;', '/': '&#47;' })[c];
        });
    }

    function firstName(s) {
        return (s || '').trim().split(/\s+/)[0] || '';
    }

    function postcodeArea(s) {
        var p = (s || '').trim().toUpperCase();
        var m = p.match(/^([A-Z]{1,2}\d{1,2}[A-Z]?)/);
        return m ? m[1] : null;
    }

    // Normalises a UK phone to national digits (leading 0) so we can validate by
    // digit count rather than a rigid pattern — accepts +44, 0044, (0), brackets,
    // spaces and hyphens. Returns '' if it doesn't look like a UK number.
    function normaliseUkPhone(value) {
        var digits = (value || '').replace(/[^\d+]/g, '');
        digits = digits
            .replace(/^\+44/, '0')          // +44 7… -> 07…
            .replace(/^0044/, '0')          // 0044 7… -> 07…
            .replace(/^44(?=\d{9,})/, '0'); // bare 44XXXXXXXXX -> 0…
        digits = digits.replace(/\D/g, ''); // drop any stray '+'
        digits = digits.replace(/^00(?=\d)/, '0'); // +44 (0)7… collapsed 00 -> 0
        // UK numbers are 10–11 digits starting 0; 01/02/03 landline, 07 mobile,
        // 08/09 non-geographic. Accept all so we never hard-block a real caller.
        return /^0[123789]\d{8,9}$/.test(digits) ? digits : '';
    }

    // Detects whether the single contact field holds a valid email OR UK phone.
    function validateContact(value) {
        var cleaned = (value || '').trim();
        if (!cleaned) {
            return { valid: false, message: 'Please add a phone number or email so we can reach you' };
        }
        if (cleaned.indexOf('@') !== -1) {
            if (!emailRegex.test(cleaned)) {
                return { valid: false, message: 'That email doesn’t look right — please check it' };
            }
            return { valid: true, type: 'email', value: cleaned, message: '' };
        }
        // No @ — treat as a phone number.
        if (!normaliseUkPhone(cleaned)) {
            return { valid: false, message: 'Enter a UK phone (e.g. 07123 456789 or 01737 652515) or an email' };
        }
        return { valid: true, type: 'phone', value: cleaned, message: '' };
    }

    // ---- success / error UI ------------------------------------------------
    function showSuccess(form, name) {
        var card = form.closest('.quote-card') || form.parentElement;
        if (!card) return;
        var safeName = escapeHtml(firstName(name));
        var greeting = safeName ? 'Got it, ' + safeName + '.' : "Got it. We’ve got your details.";
        card.innerHTML =
            '<div style="text-align:center;padding:var(--space-3) var(--space-2);">' +
                '<div style="display:inline-flex;align-items:center;justify-content:center;width:56px;height:56px;border-radius:50%;background:#e7f8ec;color:#28a745;font-size:1.75rem;font-weight:700;margin-bottom:var(--space-2);">&#10004;</div>' +
                '<h3 style="margin:0 0 var(--space-1);font-size:1.5rem;">' + greeting + '</h3>' +
                '<p style="margin:0 0 var(--space-2);color:var(--muted);">We&rsquo;ve got your details. Patrick will be in touch within 2 hours during working hours.</p>' +
                '<p style="margin:0;font-size:0.9rem;color:var(--muted);">In a hurry? Call now: <a href="tel:+441737652515" style="color:var(--accent);font-weight:600;">01737 652 515</a></p>' +
            '</div>';
    }

    // Soft landing when the server-side spam filter wrongly rejects a real lead:
    // keep them on a positive path (call now) instead of an error dead-end.
    function showCallFallback(form) {
        var card = form.closest('.quote-card') || form.parentElement;
        if (!card) return;
        card.innerHTML =
            '<div style="text-align:center;padding:var(--space-3) var(--space-2);">' +
                '<h3 style="margin:0 0 var(--space-1);font-size:1.5rem;">Almost there!</h3>' +
                '<p style="margin:0 0 var(--space-2);color:var(--muted);">We couldn&rsquo;t process the form just now &mdash; the quickest way to get your quote is a 30-second call.</p>' +
                '<p style="margin:0 0 var(--space-2);"><a href="tel:+441737652515" class="btn btn--accent btn--lg" style="display:inline-block;">Call 01737 652 515</a></p>' +
                '<p style="margin:0;font-size:0.9rem;color:var(--muted);">Mon&ndash;Sat 8am&ndash;6pm &middot; Sun 9am&ndash;5pm</p>' +
            '</div>';
    }

    function showError(form, btn, originalText, msg) {
        if (btn) {
            btn.disabled = false;
            btn.textContent = originalText;
        }
        alert(msg || 'Sorry, something went wrong. Please call 01737 652 515 or try again.');
    }

    // ---- submit ------------------------------------------------------------
    function handleSubmit(form, e) {
        e.preventDefault();

        var nameInput = form.querySelector('input[name="name"]');
        var postcodeInput = form.querySelector('input[name="postcode"]');
        var contactInput = form.querySelector('#contact') || form.querySelector('[name="contact"]');
        var contactError = document.getElementById('contactError');

        if (contactError) contactError.textContent = '';

        var name = nameInput ? nameInput.value.trim() : '';
        var isValid = true;

        // Name (browser also enforces required; double-check).
        if (name.length < 2) {
            isValid = false;
        }

        // Contact: phone OR email.
        var contactResult = { valid: false };
        if (contactInput) {
            contactResult = validateContact(contactInput.value);
            if (!contactResult.valid) {
                if (contactError) {
                    contactError.textContent = contactResult.message;
                    contactError.style.color = '#ef4444';
                }
                if (window.JWAnalytics && JWAnalytics.trackQuoteValidationError) {
                    JWAnalytics.trackQuoteValidationError('contact', 'invalid_format');
                }
                isValid = false;
            }
        }

        if (!isValid) {
            if (contactInput && !contactResult.valid) contactInput.focus();
            return;
        }

        var postcode = postcodeInput ? postcodeInput.value.trim() : '';

        // Stash for cross-page prefill (mirrors lead-capture.js behaviour).
        try {
            sessionStorage.setItem('jw_lead', JSON.stringify({
                name: name,
                postcode: postcode,
                email: contactResult.type === 'email' ? contactResult.value : '',
                t: Date.now()
            }));
        } catch (err) { /* private mode — non-fatal */ }

        // Build the payload: feed the detected contact into the right named field
        // so the Web3Forms email shows "Phone" or "Email" correctly.
        var formData = new FormData(form);
        formData.delete('contact');
        if (contactResult.type === 'email') {
            formData.set('email', contactResult.value);
        } else if (contactResult.type === 'phone') {
            formData.set('phone', contactResult.value);
        }

        var btn = form.querySelector('button[type="submit"]');
        var originalText = btn ? btn.textContent : '';
        if (btn) {
            btn.textContent = 'Sending...';
            btn.disabled = true;
        }

        var serviceVal = (form.querySelector('[name="service"]') || {}).value || null;

        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        })
            .then(function (r) { return r.json().catch(function () { return null; }); })
            .then(function (data) {
                if (data && data.success) {
                    if (window.JWAnalytics) {
                        if (JWAnalytics.trackQuoteSubmit) {
                            try {
                                JWAnalytics.trackQuoteSubmit({
                                    source: 'quote_page',
                                    postcode_area: postcodeArea(postcode),
                                    contact_type: contactResult.type || null,
                                    service: serviceVal
                                });
                            } catch (err) {}
                        }
                        if (contactResult.type === 'email' && JWAnalytics.identifyLead) {
                            try {
                                JWAnalytics.identifyLead(contactResult.value, {
                                    name: name || null,
                                    postcode_area: postcodeArea(postcode),
                                    service: serviceVal
                                });
                            } catch (err) {}
                        }
                    }
                    showSuccess(form, name);
                } else {
                    var msg = data && data.message ? data.message : 'Form submission failed.';
                    if (window.JWAnalytics && JWAnalytics.trackQuoteSubmitError) JWAnalytics.trackQuoteSubmitError(msg);
                    // A real person can be wrongly flagged by the server-side spam
                    // filter. Never dead-end them — show a friendly "call us" card
                    // instead of a hard alert so the lead isn't lost.
                    if (/spam/i.test(msg)) {
                        showCallFallback(form);
                    } else {
                        showError(form, btn, originalText, 'Sorry — ' + msg + ' Please call 01737 652 515 or try again.');
                    }
                }
            })
            .catch(function (error) {
                if (window.JWAnalytics && JWAnalytics.trackQuoteSubmitError) {
                    JWAnalytics.trackQuoteSubmitError(error && error.message ? error.message : 'network_error');
                }
                showError(form, btn, originalText, 'Network error — could not submit. Please call 01737 652 515 or try again.');
            });
    }

    // ---- wiring ------------------------------------------------------------
    function init() {
        var form = document.getElementById('quoteForm');
        if (!form) return;
        if (form.dataset.jwFormBound === '1') return;
        form.dataset.jwFormBound = '1';
        // Belt-and-braces: ensure lead-capture.js never also binds this form.
        form.dataset.jwLeadCaptureBound = '1';

        var contactInput = form.querySelector('#contact') || form.querySelector('[name="contact"]');
        var contactError = document.getElementById('contactError');

        // Real-time contact feedback. While typing we only ever show a positive
        // confirmation (never nag mid-entry); the "looks off" hint is reserved for
        // blur, so we don't hard-block someone halfway through a number.
        if (contactInput && contactError) {
            contactInput.addEventListener('input', function () {
                if (!this.value.trim()) { contactError.textContent = ''; return; }
                var result = validateContact(this.value);
                if (result.valid) {
                    contactError.textContent = result.type === 'email'
                        ? '✓ Email looks good'
                        : '✓ Phone number looks good';
                    contactError.style.color = '#28a745';
                } else if (contactError.style.color !== 'rgb(239, 68, 68)') {
                    // Don't surface the error while typing — clear stale positives only.
                    contactError.textContent = '';
                }
            });
            contactInput.addEventListener('blur', function () {
                if (!this.value.trim()) { contactError.textContent = ''; return; }
                var result = validateContact(this.value);
                if (!result.valid) {
                    contactError.textContent = result.message;
                    contactError.style.color = '#ef4444';
                    if (window.JWAnalytics && JWAnalytics.trackQuoteValidationError) {
                        JWAnalytics.trackQuoteValidationError('contact', 'invalid_format');
                    }
                } else {
                    contactError.textContent = result.type === 'email'
                        ? '✓ Email looks good'
                        : '✓ Phone number looks good';
                    contactError.style.color = '#28a745';
                    if (window.JWAnalytics && JWAnalytics.trackQuoteFieldComplete) {
                        JWAnalytics.trackQuoteFieldComplete('contact');
                    }
                }
            });
        }

        form.addEventListener('submit', function (e) { handleSubmit(form, e); });

        // Track first interaction once per page load.
        var started = false;
        function markStarted(field) {
            if (started) return;
            // Don't burn the one-shot flag before consent: pre-consent the
            // tracker call is a no-op, so wait until analytics can actually fire.
            if (window.JWConsent && JWConsent.status && JWConsent.status() !== 'accepted') return;
            started = true;
            if (window.JWAnalytics && JWAnalytics.trackQuoteStart) JWAnalytics.trackQuoteStart(field);
        }
        form.addEventListener('focus', function (e) {
            markStarted(e.target && e.target.name ? e.target.name : 'unknown');
        }, true);
        form.addEventListener('input', function (e) {
            markStarted(e.target && e.target.name ? e.target.name : 'unknown');
        }, true);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
