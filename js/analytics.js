// Google Analytics 4 Setup
// Replace GA_MEASUREMENT_ID with your actual GA4 Measurement ID (format: G-XXXXXXXXXX)

const GA_MEASUREMENT_ID = 'G-YSH4MVSPDJ';

// Load Google Analytics
(function() {
    // Only load if we have a valid measurement ID
    if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
        console.warn('Google Analytics: Measurement ID not configured');
        return;
    }

    // Create script element for gtag.js
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Initialize dataLayer and gtag function
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
        'anonymize_ip': true,
        'cookie_flags': 'SameSite=None;Secure'
    });

    // Track page views
    gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: window.location.pathname
    });
})();

// Custom event tracking functions
const Analytics = {
    // Track form submissions
    trackFormSubmission: function(formName) {
        if (window.gtag) {
            gtag('event', 'form_submission', {
                'event_category': 'engagement',
                'event_label': formName
            });
        }
    },

    // Track CTA clicks
    trackCTAClick: function(ctaName) {
        if (window.gtag) {
            gtag('event', 'cta_click', {
                'event_category': 'engagement',
                'event_label': ctaName
            });
        }
    },

    // Track phone number clicks
    trackPhoneClick: function() {
        if (window.gtag) {
            gtag('event', 'phone_click', {
                'event_category': 'contact',
                'event_label': 'Phone Number Click'
            });
        }
    },

    // Track service page views
    trackServiceView: function(serviceName) {
        if (window.gtag) {
            gtag('event', 'service_view', {
                'event_category': 'services',
                'event_label': serviceName
            });
        }
    },

    // Track area page views
    trackAreaView: function(areaName) {
        if (window.gtag) {
            gtag('event', 'area_view', {
                'event_category': 'areas',
                'event_label': areaName
            });
        }
    },

    // Track guide/blog views
    trackGuideView: function(guideName) {
        if (window.gtag) {
            gtag('event', 'guide_view', {
                'event_category': 'content',
                'event_label': guideName
            });
        }
    },

    // Track quote form start (when user starts filling form)
    trackQuoteStart: function() {
        if (window.gtag) {
            gtag('event', 'quote_start', {
                'event_category': 'conversion',
                'event_label': 'Quote Form Started'
            });
        }
    },

    // Track successful quote submission
    trackQuoteComplete: function() {
        if (window.gtag) {
            gtag('event', 'generate_lead', {
                'event_category': 'conversion',
                'event_label': 'Quote Form Completed',
                'value': 1
            });
        }
    }
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Analytics;
}
