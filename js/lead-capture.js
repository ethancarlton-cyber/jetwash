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
  // UK numbers: landline (01/02/03) or mobile (07), optional +44, spaces allowed.
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var phoneRegex = /^(\+44\s?|0)[1237]\d[\d\s]{7,12}$/;

  // Accepts EITHER a valid UK phone OR an email in a single "contact" field.
  // Mirrors js/form.js so inline/sidebar forms are phone-OR-email (not email-required).
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
    var stripped = cleaned.replace(/[\s()\-]/g, '');
    if (!phoneRegex.test(stripped)) {
      return { valid: false, message: 'Enter a valid UK phone (07… or 01…) or an email address' };
    }
    return { valid: true, type: 'phone', value: cleaned, message: '' };
  }

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

  function showContactError(form, msg) {
    var contactEl = form.querySelector('[name="contact"]');
    var slot = form.querySelector('.jw-contact-error');
    if (!slot && contactEl) {
      slot = document.createElement('p');
      slot.className = 'jw-contact-error';
      slot.setAttribute('role', 'alert');
      slot.style.cssText = 'margin:4px 0 0;font-size:0.85rem;color:#ef4444;';
      contactEl.insertAdjacentElement('afterend', slot);
    }
    if (slot) slot.textContent = msg || '';
    if (contactEl) contactEl.focus();
  }

  function handleSubmit(form, e) {
    e.preventDefault();

    var nameEl = form.querySelector('input[name="name"]');
    var postcodeEl = form.querySelector('input[name="postcode"]');
    // New combined field; fall back to legacy email/phone inputs if a form
    // hasn't been migrated yet.
    var contactEl = form.querySelector('[name="contact"]');
    var emailEl = form.querySelector('input[name="email"]');
    var phoneEl = form.querySelector('input[name="phone"]');
    var name = nameEl ? nameEl.value.trim() : '';
    var postcode = postcodeEl ? postcodeEl.value.trim() : '';

    if (!name || !postcode) return;

    // Resolve the contact: phone OR email, from whichever field exists.
    var contactType = null;
    var contactValue = '';
    if (contactEl) {
      var result = validateContact(contactEl.value);
      if (!result.valid) { showContactError(form, result.message); return; }
      var slot = form.querySelector('.jw-contact-error');
      if (slot) slot.textContent = '';
      contactType = result.type;
      contactValue = result.value;
    } else {
      // Legacy markup: accept phone OR email, neither hard-required.
      var legacyEmail = emailEl ? emailEl.value.trim() : '';
      var legacyPhone = phoneEl ? phoneEl.value.trim() : '';
      if (legacyEmail) {
        var er = validateContact(legacyEmail);
        if (!er.valid) { if (emailEl) emailEl.focus(); return; }
        contactType = 'email'; contactValue = legacyEmail;
      } else if (legacyPhone) {
        var pr = validateContact(legacyPhone);
        if (!pr.valid) { if (phoneEl) phoneEl.focus(); return; }
        contactType = 'phone'; contactValue = legacyPhone;
      } else {
        return; // nothing to send
      }
    }

    var email = contactType === 'email' ? contactValue : '';

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

    // Map the single contact field into the correctly-named Web3Forms field
    // so the notification email shows "Phone" or "Email" correctly.
    var fd = new FormData(form);
    if (contactEl) {
      fd.delete('contact');
      if (contactType === 'email') fd.set('email', contactValue);
      else if (contactType === 'phone') fd.set('phone', contactValue);
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
                contact_type: contactType,
                service: (form.querySelector('[name="service"]') || {}).value || null
              });
            } catch (err) {}
          }
          if (email && window.JWAnalytics && typeof JWAnalytics.identifyLead === 'function') {
            try { JWAnalytics.identifyLead(email, { name: name, postcode_area: postcodeArea(postcode) }); } catch (err) {}
          }
        } else {
          var msg = data && data.message ? data.message : 'Submission failed.';
          showError(form, 'Sorry — ' + msg + ' Please call 01737 652 515 or try again.');
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
