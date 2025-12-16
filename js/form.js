// JetWash Haywards Heath - Form Validation & Handling
// =========================================================

document.addEventListener('DOMContentLoaded', function() {

    // Form validation for quote form
    const quoteForm = document.getElementById('quoteForm');

    if (quoteForm) {
        // UK Postcode validation regex
        const postcodeRegex = /^[A-Z]{1,2}[0-9]{1,2}[A-Z]?\s?[0-9][A-Z]{2}$/i;

        // UK Phone validation regex (mobile and landline)
        const phoneRegex = /^(\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$/;

        // Service area postcodes (RH and BN prefixes within range)
        const validPostcodeAreas = ['RH', 'BN', 'GU'];

        // Postcode validation
        function validatePostcode(postcode) {
            const cleaned = postcode.trim().toUpperCase();

            if (!postcodeRegex.test(cleaned)) {
                return {
                    valid: false,
                    message: 'Please enter a valid UK postcode (e.g., RH16 1AB)'
                };
            }

            // Check if postcode is in service area
            const prefix = cleaned.substring(0, 2).replace(/[0-9]/g, '');
            if (!validPostcodeAreas.includes(prefix)) {
                return {
                    valid: true, // Still valid format, but show warning
                    message: 'This postcode may be outside our service area. We\'ll confirm coverage when we contact you.'
                };
            }

            return { valid: true, message: '' };
        }

        // Phone validation
        function validatePhone(phone) {
            const cleaned = phone.trim();

            if (!phoneRegex.test(cleaned)) {
                return {
                    valid: false,
                    message: 'Please enter a valid UK mobile number (e.g., 07XXX XXXXXX)'
                };
            }

            return { valid: true, message: '' };
        }

        // Real-time validation for postcode
        const postcodeInput = document.getElementById('postcode');
        const postcodeError = document.getElementById('postcodeError');

        if (postcodeInput && postcodeError) {
            postcodeInput.addEventListener('blur', function() {
                const result = validatePostcode(this.value);
                if (!result.valid) {
                    postcodeError.textContent = result.message;
                    postcodeError.style.color = '#ef4444'; // Error color
                } else if (result.message) {
                    postcodeError.textContent = result.message;
                    postcodeError.style.color = '#f59e0b'; // Warning color
                } else {
                    postcodeError.textContent = '';
                }
            });
        }

        // Real-time validation for phone
        const phoneInput = document.getElementById('phone');
        const phoneError = document.getElementById('phoneError');

        if (phoneInput && phoneError) {
            phoneInput.addEventListener('blur', function() {
                const result = validatePhone(this.value);
                if (!result.valid) {
                    phoneError.textContent = result.message;
                } else {
                    phoneError.textContent = '';
                }
            });
        }

        // Form submission
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Clear previous errors
            const errorElements = document.querySelectorAll('.error-message');
            errorElements.forEach(el => el.textContent = '');

            let isValid = true;

            // Validate name
            const name = document.getElementById('name');
            const nameError = document.getElementById('nameError');
            if (name && name.value.trim().length < 2) {
                nameError.textContent = 'Please enter your full name';
                isValid = false;
            }

            // Validate postcode
            if (postcodeInput) {
                const postcodeResult = validatePostcode(postcodeInput.value);
                if (!postcodeResult.valid) {
                    postcodeError.textContent = postcodeResult.message;
                    isValid = false;
                }
            }

            // Validate phone
            if (phoneInput) {
                const phoneResult = validatePhone(phoneInput.value);
                if (!phoneResult.valid) {
                    phoneError.textContent = phoneResult.message;
                    isValid = false;
                }
            }

            // If all validations pass, submit the form to Web3Forms
            if (isValid) {
                // Show loading state
                const submitButton = quoteForm.querySelector('button[type="submit"]');
                const originalButtonText = submitButton.textContent;
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;

                const formData = new FormData(quoteForm);

                console.log('Submitting form to:', quoteForm.action);

                fetch(quoteForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                .then(response => {
                    console.log('Response status:', response.status);
                    return response.json();
                })
                .then(data => {
                    console.log('Response data:', data);
                    if (data.success) {
                        showSuccessMessage();
                    } else {
                        submitButton.textContent = originalButtonText;
                        submitButton.disabled = false;
                        alert('Error: ' + (data.message || 'Form submission failed. Please call us at 07000 000000 instead.'));
                    }
                })
                .catch(error => {
                    console.error('Form submission error:', error);
                    submitButton.textContent = originalButtonText;
                    submitButton.disabled = false;
                    alert('Network error: Could not submit form. Please call us at 07000 000000 or try again later.');
                });
            }
        });

        function showSuccessMessage() {
            quoteForm.style.display = 'none';
            const successDiv = document.getElementById('formSuccess');
            if (successDiv) {
                successDiv.style.display = 'block';
            }
        }
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Add loading animation to buttons on click
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function() {
            // Only add loading to submit buttons
            if (this.type === 'submit') {
                const originalText = this.textContent;
                this.textContent = 'Submitting...';
                this.disabled = true;

                // Re-enable after 5 seconds (fallback)
                setTimeout(() => {
                    this.textContent = originalText;
                    this.disabled = false;
                }, 5000);
            }
        });
    });

    // Phone number formatting (add spaces for readability)
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '');

            // Format as: 07XXX XXXXXX
            if (value.length > 5) {
                value = value.slice(0, 5) + ' ' + value.slice(5);
            }
            if (value.length > 9) {
                value = value.slice(0, 9) + ' ' + value.slice(9, 12);
            }

            e.target.value = value;
        });
    }

    // Postcode formatting (uppercase and add space)
    if (postcodeInput) {
        postcodeInput.addEventListener('input', function(e) {
            let value = e.target.value.toUpperCase().replace(/\s/g, '');

            // Add space before last 3 characters
            if (value.length > 3) {
                value = value.slice(0, -3) + ' ' + value.slice(-3);
            }

            e.target.value = value;
        });
    }

    // Track form interactions for analytics (when implemented)
    quoteForm && quoteForm.addEventListener('focus', function(e) {
        // Google Analytics event tracking can be added here
        // gtag('event', 'form_interaction', { 'field': e.target.name });
    }, true);

});

// Service worker registration for PWA (future enhancement)
if ('serviceWorker' in navigator) {
    // Uncomment when service worker is implemented
    // window.addEventListener('load', function() {
    //     navigator.serviceWorker.register('/sw.js');
    // });
}