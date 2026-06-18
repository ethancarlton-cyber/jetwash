// JetWash — lightweight quote-form handler
// Intercepts native submission on the homepage / sidebar / inline forms so:
//   1. User sees a visible "Got it, Patrick will call within 2hrs" success state
//      instead of being teleported to a blank /quote page.
//   2. Their name / postcode / email are stashed in sessionStorage so /quote
//      can prefill the rest of the fields if they want a precise quote.
// The full /quote page form (id="quoteForm") is ALSO handled here — it submits
// via AJAX and shows the same in-page success state (the legacy form.js handler
// is orphaned/incompatible and is no longer used).

(function () {
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

  // Permissive email: local@domain.tld.
  var emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

  // Normalise a UK phone to national digits (leading 0) so we validate by digit
  // count, not a rigid pattern — accepts +44, 0044, (0), brackets, spaces, hyphens.
  function normaliseUkPhone(value) {
    var digits = (value || '').replace(/[^\d+]/g, '');
    digits = digits
      .replace(/^\+44/, '0')
      .replace(/^0044/, '0')
      .replace(/^44(?=\d{9,})/, '0');
    digits = digits.replace(/\D/g, '');
    digits = digits.replace(/^00(?=\d)/, '0');
    return /^0[123789]\d{8,9}$/.test(digits) ? digits : '';
  }

  // Valid if EITHER a valid email OR a valid UK phone is present.
  function validateContact(value) {
    var cleaned = (value || '').trim();
    if (!cleaned) {
      return { valid: false, message: 'Please add a phone number or email so we can reach you' };
    }
    if (cleaned.indexOf('@') !== -1) {
      return emailRegex.test(cleaned)
        ? { valid: true, type: 'email', value: cleaned }
        : { valid: false, message: 'That email doesn’t look right — please check it' };
    }
    return normaliseUkPhone(cleaned)
      ? { valid: true, type: 'phone', value: cleaned }
      : { valid: false, message: 'Enter a UK phone (e.g. 07123 456789 or 01737 652515) or an email' };
  }

  function showSuccess(form, name) {
    var card = form.closest('.quote-card') || form.parentElement;
    if (!card) return;
    var safeName = escapeHtml(firstName(name));
    var greeting = safeName ? 'Got it, ' + safeName + '.' : "Got it. We've got your details.";
    card.innerHTML =
      '<div style="text-align:center;padding:var(--space-3) var(--space-2);">' +
        '<div style="display:inline-flex;align-items:center;justify-content:center;width:56px;height:56px;border-radius:50%;background:#e7f8ec;color:#28a745;font-size:1.75rem;font-weight:700;margin-bottom:var(--space-2);">&#10004;</div>' +
        '<h3 style="margin:0 0 var(--space-1);font-size:1.5rem;">' + greeting + '</h3>' +
        '<p style="margin:0 0 var(--space-2);color:var(--muted);">We&rsquo;ve got your details. Patrick will call back within 2 hours during working hours.</p>' +
        '<p style="margin:0 0 var(--space-2);font-size:0.95rem;">Want a more precise quote? <a href="/quote" style="color:var(--accent);font-weight:600;">Add a few more details &rarr;</a></p>' +
        '<p style="margin:0;font-size:0.9rem;color:var(--muted);">Or call now: <a href="tel:+441737652515" style="color:var(--accent);font-weight:600;">01737 652 515</a></p>' +
      '</div>';
  }

  function showError(form, msg) {
    var btn = form.querySelector('button[type="submit"]');
    if (btn) {
      btn.disabled = false;
      if (btn.dataset.origText) btn.textContent = btn.dataset.origText;
    }
    alert(msg || 'Sorry, something went wrong. Please call 01737 652 515 or try again.');
  }

  function handleSubmit(form, e) {
    e.preventDefault();

    var nameEl = form.querySelector('input[name="name"]');
    var postcodeEl = form.querySelector('input[name="postcode"]');
    // Prefer the combined "phone OR email" contact field; fall back to a legacy
    // email-only field if a form still has one.
    var contactEl = form.querySelector('[name="contact"]') || form.querySelector('input[name="email"]');
    var contactErrorEl = form.querySelector('.error-message') ||
      (contactEl && contactEl.getAttribute('aria-describedby')
        ? document.getElementById(contactEl.getAttribute('aria-describedby'))
        : null);
    var name = nameEl ? nameEl.value.trim() : '';
    var postcode = postcodeEl ? postcodeEl.value.trim() : '';

    // The required attribute blocks empty name/postcode; double-check name/postcode.
    if (!name || !postcode || !contactEl) return;

    // Contact must be a valid phone OR email.
    var contactResult = validateContact(contactEl.value);
    if (!contactResult.valid) {
      if (contactErrorEl) {
        contactErrorEl.textContent = contactResult.message;
        contactErrorEl.style.color = '#ef4444';
      }
      if (window.JWAnalytics && JWAnalytics.trackQuoteValidationError) {
        try { JWAnalytics.trackQuoteValidationError('contact', 'invalid_format'); } catch (err) {}
      }
      contactEl.focus();
      return;
    }
    var email = contactResult.type === 'email' ? contactResult.value : '';

    try {
      sessionStorage.setItem('jw_lead', JSON.stringify({
        name: name,
        postcode: postcode,
        email: email,
        t: Date.now()
      }));
    } catch (err) { /* private mode / storage disabled — non-fatal */ }

    var btn = form.querySelector('button[type="submit"]');
    if (btn) {
      btn.dataset.origText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;
    }

    // Map the combined contact field into the right named field so the emailed
    // lead clearly shows "Phone" or "Email".
    var fd = new FormData(form);
    fd.delete('contact');
    if (contactResult.type === 'email') {
      fd.set('email', contactResult.value);
    } else {
      fd.set('phone', contactResult.value);
    }

    fetch(form.action, {
      method: 'POST',
      body: fd,
      headers: { 'Accept': 'application/json' }
    })
      .then(function (r) { return r.json().catch(function () { return null; }); })
      .then(function (data) {
        if (data && data.success) {
          showSuccess(form, name);
          if (window.JWAnalytics && typeof JWAnalytics.trackQuoteSubmit === 'function') {
            try {
              JWAnalytics.trackQuoteSubmit({
                source: form.id === 'quoteForm' ? 'quote_page' : 'lightweight',
                postcode_area: postcodeArea(postcode),
                contact_type: contactResult.type,
                service: (form.querySelector('[name="service"]') || {}).value || null
              });
            } catch (err) {}
          }
          if (email && window.JWAnalytics && typeof JWAnalytics.identifyLead === 'function') {
            try { JWAnalytics.identifyLead(email, { name: name, postcode_area: postcodeArea(postcode) }); } catch (err) {}
          }
        } else {
          var msg = data && data.message ? data.message : 'Submission failed.';
          // A wrongly-flagged real lead should never dead-end: show the in-page
          // success card pointing them to call instead of an error alert.
          if (/spam/i.test(msg)) {
            showSuccess(form, name);
          } else {
            showError(form, 'Sorry — ' + msg + ' Please call 01737 652 515 or try again.');
          }
        }
      })
      .catch(function () {
        showError(form, 'Network error. Please call 01737 652 515 or try again.');
      });
  }

  function attachHandlers() {
    var forms = document.querySelectorAll('form.quote-form');
    Array.prototype.forEach.call(forms, function (form) {
      // Only handle Web3Forms submissions.
      if (!form.action || form.action.indexOf('api.web3forms.com') === -1) return;
      // Idempotent — don't double-bind if script loads twice.
      if (form.dataset.jwLeadCaptureBound === '1') return;
      form.dataset.jwLeadCaptureBound = '1';
      form.addEventListener('submit', function (e) { handleSubmit(form, e); });

      // Real-time hint on the combined contact field (positive while typing,
      // gentle correction on blur — never a hard mid-entry block).
      var contactEl = form.querySelector('[name="contact"]');
      var errEl = contactEl && contactEl.getAttribute('aria-describedby')
        ? document.getElementById(contactEl.getAttribute('aria-describedby'))
        : null;
      if (contactEl && errEl) {
        contactEl.addEventListener('input', function () {
          if (!this.value.trim()) { errEl.textContent = ''; return; }
          var r = validateContact(this.value);
          if (r.valid) {
            errEl.textContent = r.type === 'email' ? '✓ Email looks good' : '✓ Phone number looks good';
            errEl.style.color = '#28a745';
          } else if (errEl.style.color !== 'rgb(239, 68, 68)') {
            errEl.textContent = '';
          }
        });
        contactEl.addEventListener('blur', function () {
          if (!this.value.trim()) { errEl.textContent = ''; return; }
          var r = validateContact(this.value);
          if (r.valid) {
            errEl.textContent = r.type === 'email' ? '✓ Email looks good' : '✓ Phone number looks good';
            errEl.style.color = '#28a745';
          } else {
            errEl.textContent = r.message;
            errEl.style.color = '#ef4444';
          }
        });
      }
    });
  }

  function prefillQuotePage() {
    var quoteForm = document.getElementById('quoteForm');
    if (!quoteForm) return;
    var raw;
    try { raw = sessionStorage.getItem('jw_lead'); } catch (err) { return; }
    if (!raw) return;
    var lead;
    try { lead = JSON.parse(raw); } catch (err) { return; }
    if (!lead) return;
    // 30 minute expiry — don't auto-prefill stale data
    if (lead.t && Date.now() - lead.t > 30 * 60 * 1000) {
      try { sessionStorage.removeItem('jw_lead'); } catch (err) {}
      return;
    }

    var fields = [
      ['input[name="name"]', lead.name],
      ['input[name="postcode"]', lead.postcode],
      ['#postcode', lead.postcode],
      // Quote page now uses a combined phone/email "contact" field.
      ['#contact', lead.email],
      ['input[name="email"]', lead.email]
    ];
    var prefilled = false;
    fields.forEach(function (pair) {
      var el = quoteForm.querySelector(pair[0]);
      if (el && !el.value && pair[1]) {
        el.value = pair[1];
        prefilled = true;
      }
    });

    if (!prefilled) return;

    var banner = document.createElement('div');
    banner.setAttribute('role', 'status');
    banner.style.cssText = 'background:#e7f8ec;border:1px solid #28a745;padding:12px 16px;border-radius:8px;margin-bottom:16px;color:#1a5e2a;font-size:0.95rem;display:flex;align-items:center;gap:8px;';
    banner.innerHTML = '<span style="font-size:1.1rem;">&#10004;</span><span>Got your details from earlier &mdash; just add the rest below for a precise quote.</span>';
    quoteForm.parentElement.insertBefore(banner, quoteForm);

    // Clear so refresh / back-button doesn't double-prefill
    try { sessionStorage.removeItem('jw_lead'); } catch (err) {}
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      attachHandlers();
      prefillQuotePage();
    });
  } else {
    attachHandlers();
    prefillQuotePage();
  }
})();
