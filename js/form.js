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
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // UK numbers: landline (01/02/03) or mobile (07), optional +44, spaces allowed.
    var phoneRegex = /^(\+44\s?|0)[1237]\d[\d\s]{7,12}$/;

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

    // Detects whether the single contact field holds a valid email OR UK phone.
    function validateContact(value) {
        var cleaned = (value || '').trim();
        if (!cleaned) {
            return { valid: false, message: 'Please enter a phone number or email so we can reach you' };
        }
        if (cleaned.indexOf('@') !== -1) {
            if (!emailRegex.test(cleaned)) {
                return { valid: false, message: 'That email doesn’t look right — check it and try again' };
            }
            return { valid: true, type: 'email', value: cleaned, message: '' };
        }
        // No @ — treat as a phone number.
        var stripped = cleaned.replace(/[\s()\-]/g, '');
        if (!phoneRegex.test(stripped)) {
            return { valid: false, message: 'Enter a valid UK phone (07… or 01…) or an email address' };
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
                    showError(form, btn, originalText, 'Sorry — ' + msg + ' Please call 01737 652 515 or try again.');
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

        // Real-time contact validation on blur.
        if (contactInput && contactError) {
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
                    contactError.textContent = '';
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
