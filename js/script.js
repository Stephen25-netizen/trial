// Vastland Corporate Frontend Engine

document.addEventListener("DOMContentLoaded", function () {
    
    // 1. Preloader dismissal
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            preloader.style.opacity = '0';
            setTimeout(() => preloader.style.display = 'none', 500);
        });
    }

    // 2. Navigation Scroll Tracking (Sticky Header effect)
    window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('sticky-nav');
        } else {
            navbar.classList.remove('sticky-nav');
        }

        // Back to top button tracking
        const backTopBtn = document.getElementById('backToTop');
        if (backTopBtn) {
            if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                backTopBtn.style.display = "block";
            } else {
                backTopBtn.style.display = "none";
            }
        }
    });

    // 3. Animated Statistics Counters
    const counters = document.querySelectorAll('.counter-value');
    if (counters.length > 0) {
        const runCounters = () => {
            counters.forEach(counter => {
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText;
                    const speed = target / 100; // adjust resolution here

                    if (count < target) {
                        counter.innerText = Math.ceil(count + speed);
                        setTimeout(updateCount, 20);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
            });
        };

        // Trigger on intersection or fallback execution
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                if(entries[0].isIntersecting) {
                    runCounters();
                    observer.disconnect();
                }
            }, { threshold: 0.5 });
            const targetSec = document.querySelector('.stats-section');
            if (targetSec) observer.observe(targetSec);
        } else {
            setTimeout(runCounters, 1000);
        }
    }

    // 4. Contact Form Validation
    const contactForm = document.getElementById('vastlandContactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            if (!contactForm.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                event.preventDefault();
                alert('Thank you! Your inquiry has been routed successfully.');
                contactForm.reset();
            }
            contactForm.classList.add('was-validated');
        }, false);
    }
});

// Back to top click action
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}