// JetWash — lightweight quote-form handler
// Intercepts native submission on the homepage / sidebar / inline forms so:
//   1. User sees a visible "Got it, Patrick will call within 2hrs" success state
//      instead of being teleported to a blank /quote page.
//   2. Their name / postcode / phone / email are stashed in sessionStorage so
//      /quote can prefill the rest of the fields if they want a precise quote.
// The full /quote page form (id="quoteForm") is handled by js/form.js (it carries
// data-jw-lead-capture-bound="1" so this handler skips it).
//
// Fields are now natively named: phone (required), email (optional),
// service_requested (required <select>). No contact -> phone/email remap.

(function () {
  'use strict';

  // Permissive email: local@domain.tld.
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

  // Inline field-level error. Prefers an existing aria-describedby error span
  // (e.g. the hero's #heroPhoneError); otherwise injects one after the field.
  function errorSlotFor(el) {
    if (!el) return null;
    var descId = el.getAttribute('aria-describedby');
    var slot = descId ? document.getElementById(descId) : null;
    if (slot) return slot;
    slot = el.parentNode && el.parentNode.querySelector('.jw-field-error');
    if (!slot) {
      slot = document.createElement('p');
      slot.className = 'jw-field-error';
      slot.setAttribute('role', 'alert');
      slot.style.cssText = 'margin:4px 0 0;font-size:0.85rem;color:#ef4444;';
      el.insertAdjacentElement('afterend', slot);
    }
    return slot;
  }

  function showFieldError(el, msg) {
    if (!el) return;
    var slot = errorSlotFor(el);
    if (slot) { slot.textContent = msg || ''; slot.style.color = '#ef4444'; }
    el.focus();
  }

  function clearFieldError(el) {
    if (!el) return;
    var descId = el.getAttribute('aria-describedby');
    var slot = descId ? document.getElementById(descId)
      : (el.parentNode && el.parentNode.querySelector('.jw-field-error'));
    if (slot) slot.textContent = '';
  }

  function handleSubmit(form, e) {
    e.preventDefault();

    var nameEl = form.querySelector('input[name="name"]');
    var postcodeEl = form.querySelector('input[name="postcode"]');
    var phoneEl = form.querySelector('[name="phone"]');
    var emailEl = form.querySelector('input[name="email"]');
    var serviceReqEl = form.querySelector('[name="service_requested"]');

    var name = nameEl ? nameEl.value.trim() : '';
    var postcode = postcodeEl ? postcodeEl.value.trim() : '';
    var phone = phoneEl ? phoneEl.value.trim() : '';
    var email = emailEl ? emailEl.value.trim() : '';
    var serviceRequested = serviceReqEl ? serviceReqEl.value : '';

    // Browser 'required' also enforces these; double-check.
    if (!name || !postcode) return;

    // Phone: required + valid UK number.
    if (!normaliseUkPhone(phone)) {
      showFieldError(phoneEl, 'Enter a valid UK phone (e.g. 07123 456789 or 01737 652515)');
      return;
    }
    clearFieldError(phoneEl);

    // Email: optional — validate only if the user typed something.
    if (email && !emailRegex.test(email)) {
      showFieldError(emailEl, 'That email doesn’t look right — check it or leave it blank');
      return;
    }
    clearFieldError(emailEl);

    try {
      sessionStorage.setItem('jw_lead', JSON.stringify({
        name: name,
        postcode: postcode,
        phone: phone,
        email: email,
        service_requested: serviceRequested,
        t: Date.now()
      }));
    } catch (err) { /* private mode / storage disabled — non-fatal */ }

    var btn = form.querySelector('button[type="submit"]');
    if (btn) {
      btn.dataset.origText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;
    }

    // Fields are natively named — submit as-is. Trim the values we validated and
    // drop an empty optional email so it never shows as blank garbage in the email.
    var fd = new FormData(form);
    fd.set('phone', phone);
    if (email) fd.set('email', email); else fd.delete('email');

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
                contact_type: email ? 'phone_email' : 'phone',
                service: serviceRequested || (form.querySelector('[name="service"]') || {}).value || null
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

      // Real-time hint on the phone field (positive while typing, gentle
      // correction on blur — never a hard mid-entry block). Only fires where the
      // field has an associated error span (e.g. the homepage hero form).
      var phoneEl = form.querySelector('[name="phone"]');
      var errEl = phoneEl && phoneEl.getAttribute('aria-describedby')
        ? document.getElementById(phoneEl.getAttribute('aria-describedby'))
        : null;
      if (phoneEl && errEl) {
        phoneEl.addEventListener('input', function () {
          if (!this.value.trim()) { errEl.textContent = ''; return; }
          if (normaliseUkPhone(this.value)) {
            errEl.textContent = '✓ Phone number looks good';
            errEl.style.color = '#28a745';
          } else if (errEl.style.color !== 'rgb(239, 68, 68)') {
            errEl.textContent = '';
          }
        });
        phoneEl.addEventListener('blur', function () {
          if (!this.value.trim()) { errEl.textContent = ''; return; }
          if (normaliseUkPhone(this.value)) {
            errEl.textContent = '✓ Phone number looks good';
            errEl.style.color = '#28a745';
          } else {
            errEl.textContent = 'Enter a valid UK phone (07… or 01…)';
            errEl.style.color = '#ef4444';
          }
        });
      }

      // Light email feedback on blur (optional field — only nag if clearly wrong).
      var emailEl = form.querySelector('input[name="email"]');
      if (emailEl) {
        emailEl.addEventListener('blur', function () {
          var v = this.value.trim();
          if (v && !emailRegex.test(v)) {
            showFieldError(emailEl, 'That email doesn’t look right — check it or leave it blank');
          } else {
            clearFieldError(emailEl);
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
      // Quote page now uses native phone (required) + email (optional) fields.
      ['#phone', lead.phone],
      ['[name="phone"]', lead.phone],
      ['#email', lead.email],
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
