// JetWash — 2-Step Quote Form Validation & Handling

// Step navigation (global scope for onclick handlers)
function nextStep() {
    var serviceSelect = document.getElementById('service');
    var serviceError = document.getElementById('serviceError');
    var postcodeInput = document.getElementById('postcode');
    var postcodeError = document.getElementById('postcodeError');
    var valid = true;

    // Clear previous errors
    if (serviceError) serviceError.textContent = '';
    if (postcodeError) postcodeError.textContent = '';

    // Validate service selected
    if (!serviceSelect || !serviceSelect.value) {
        if (serviceError) serviceError.textContent = 'Please select a service';
        valid = false;
    }

    // Validate postcode
    if (postcodeInput) {
        var postcodeResult = validatePostcode(postcodeInput.value);
        if (!postcodeResult.valid) {
            if (postcodeError) postcodeError.textContent = postcodeResult.message;
            valid = false;
        }
    }

    if (valid) {
        document.getElementById('formStep1').classList.remove('active');
        document.getElementById('formStep2').classList.add('active');
        // Focus the first field in step 2
        var nameInput = document.getElementById('name');
        if (nameInput) nameInput.focus();
    }
}

function prevStep() {
    document.getElementById('formStep2').classList.remove('active');
    document.getElementById('formStep1').classList.add('active');
}

// UK Postcode validation
var postcodeRegex = /^[A-Z]{1,2}[0-9]{1,2}[A-Z]?\s?[0-9][A-Z]{2}$/i;
var validPostcodeAreas = ['RH', 'BN', 'GU', 'CR', 'SM', 'KT'];

function validatePostcode(postcode) {
    var cleaned = postcode.trim().toUpperCase();
    if (!cleaned) {
        return { valid: false, message: 'Please enter your postcode' };
    }
    if (!postcodeRegex.test(cleaned)) {
        return { valid: false, message: 'Please enter a valid UK postcode (e.g., RH1 2AB)' };
    }
    var prefix = cleaned.substring(0, 2).replace(/[0-9]/g, '');
    if (!validPostcodeAreas.includes(prefix)) {
        return { valid: true, message: 'This postcode may be outside our service area. We\'ll confirm coverage when we contact you.' };
    }
    return { valid: true, message: '' };
}

// Smart contact validation — detects email vs phone
var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
var phoneRegex = /^(\+44\s?|0)[1-37]\d[\d\s]{7,12}$/;

function validateContact(value) {
    var cleaned = value.trim();
    if (!cleaned) {
        return { valid: false, message: 'Please enter your email or phone number' };
    }
    // Detect format
    if (cleaned.indexOf('@') !== -1) {
        if (!emailRegex.test(cleaned)) {
            return { valid: false, message: 'Please enter a valid email address' };
        }
        return { valid: true, type: 'email', message: '' };
    }
    // Treat as phone if starts with 0, +, or contains mostly digits
    var digitCount = cleaned.replace(/[^0-9]/g, '').length;
    if (cleaned.match(/^(\+44|0)/) || digitCount >= 7) {
        if (!phoneRegex.test(cleaned.replace(/[\s()-]/g, ''))) {
            return { valid: false, message: 'Please enter a valid UK phone number (e.g., 07XXX XXXXXX)' };
        }
        return { valid: true, type: 'phone', message: '' };
    }
    return { valid: false, message: 'Please enter a valid email address or UK phone number' };
}

document.addEventListener('DOMContentLoaded', function() {
    var quoteForm = document.getElementById('quoteForm');
    var postcodeInput = document.getElementById('postcode');
    var postcodeError = document.getElementById('postcodeError');
    var contactInput = document.getElementById('contact');
    var contactError = document.getElementById('contactError');

    if (!quoteForm) return;

    // Real-time postcode validation on blur
    if (postcodeInput && postcodeError) {
        postcodeInput.addEventListener('blur', function() {
            if (!this.value.trim()) return;
            var result = validatePostcode(this.value);
            if (!result.valid) {
                postcodeError.textContent = result.message;
                postcodeError.style.color = '#ef4444';
            } else if (result.message) {
                postcodeError.textContent = result.message;
                postcodeError.style.color = '#f59e0b';
            } else {
                postcodeError.textContent = '';
            }
        });
    }

    // Real-time contact validation on blur
    if (contactInput && contactError) {
        contactInput.addEventListener('blur', function() {
            if (!this.value.trim()) return;
            var result = validateContact(this.value);
            if (!result.valid) {
                contactError.textContent = result.message;
            } else {
                contactError.textContent = '';
            }
        });
    }

    // Postcode formatting (uppercase + space)
    if (postcodeInput) {
        postcodeInput.addEventListener('input', function(e) {
            var value = e.target.value.toUpperCase().replace(/\s/g, '');
            if (value.length > 3) {
                value = value.slice(0, -3) + ' ' + value.slice(-3);
            }
            e.target.value = value;
        });
    }

    // Contact input auto-formatting for phone numbers
    if (contactInput) {
        contactInput.addEventListener('input', function(e) {
            var value = e.target.value;
            // Only format if it looks like a phone number (starts with 0 or +)
            if (value.match(/^(\+44|0)/)) {
                var digits = value.replace(/\s/g, '');
                if (digits.length > 5) {
                    digits = digits.slice(0, 5) + ' ' + digits.slice(5);
                }
                if (digits.length > 9) {
                    digits = digits.slice(0, 9) + ' ' + digits.slice(9, 15);
                }
                e.target.value = digits;
            }
        });
    }

    // Allow Enter key on step 1 to advance
    var step1 = document.getElementById('formStep1');
    if (step1) {
        step1.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                nextStep();
            }
        });
    }

    // Form submission
    quoteForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Clear previous errors
        var errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(function(el) { el.textContent = ''; });

        var isValid = true;

        // Validate name
        var nameInput = document.getElementById('name');
        var nameError = document.getElementById('nameError');
        if (nameInput && nameInput.value.trim().length < 2) {
            if (nameError) nameError.textContent = 'Please enter your name';
            isValid = false;
        }

        // Validate contact (email or phone)
        if (contactInput) {
            var contactResult = validateContact(contactInput.value);
            if (!contactResult.valid) {
                if (contactError) contactError.textContent = contactResult.message;
                isValid = false;
            }
        }

        if (!isValid) return;

        // Show loading state
        var submitButton = quoteForm.querySelector('button[type="submit"]');
        var originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        var formData = new FormData(quoteForm);

        // Parse contact field into email/phone for the submission
        var contactValue = contactInput ? contactInput.value.trim() : '';
        var contactResult = validateContact(contactValue);
        if (contactResult.type === 'email') {
            formData.append('email', contactValue);
        } else if (contactResult.type === 'phone') {
            formData.append('phone', contactValue);
        }

        fetch(quoteForm.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        })
        .then(function(response) { return response.json(); })
        .then(function(data) {
            if (data.success) {
                quoteForm.style.display = 'none';
                var successDiv = document.getElementById('formSuccess');
                if (successDiv) successDiv.style.display = 'block';
            } else {
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
                alert('Error: ' + (data.message || 'Form submission failed. Please call us at 01737 652 515 instead.'));
            }
        })
        .catch(function(error) {
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
            alert('Network error: Could not submit form. Please call us at 01737 652 515 or try again later.');
        });
    });

    // Track form interactions
    quoteForm.addEventListener('focus', function(e) {
        // Analytics event tracking placeholder
    }, true);
});

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            var href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                var target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
});
