document.addEventListener('DOMContentLoaded', function() {
    var hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            var nav = document.querySelector('.nav');
            var isOpen = nav.classList.toggle('nav-open');
            this.classList.toggle('hamburger-open');
            this.setAttribute('aria-expanded', isOpen);
        });
    }
});
