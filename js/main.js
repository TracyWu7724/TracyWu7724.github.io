/* ============================================
   Tracy Wu - Personal Portfolio JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Materialize components
    initMaterialize();

    // Initialize typing animation
    initTypingAnimation();

    // Initialize scroll animations
    initScrollAnimations();

    // Initialize smooth scrolling
    initSmoothScroll();

    // Initialize navbar behavior
    initNavbar();
});

/* Initialize Materialize Components */
function initMaterialize() {
    // Initialize mobile sidenav
    const sidenavElems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sidenavElems, {
        edge: 'right',
        draggable: true
    });
}

/* Typing Animation */
function initTypingAnimation() {
    const typingElement = document.querySelector('.typing');
    if (typingElement && typeof Typed !== 'undefined') {
        new Typed('.typing', {
            strings: [
                'Data Enthusiast',
                'Machine Learning Engineer',
                'Problem Solver'
            ],
            typeSpeed: 60,
            backSpeed: 40,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }
}

/* Scroll Animations */
function initScrollAnimations() {
    // Add fade-in class to elements
    const animatedElements = document.querySelectorAll(
        '.section-title, .about-content, .timeline-item, .project-card, .skill-category, .contact-content'
    );

    animatedElements.forEach(el => {
        el.classList.add('fade-in');
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

/* Smooth Scrolling */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();

                // Close mobile nav if open
                const sidenav = M.Sidenav.getInstance(document.querySelector('.sidenav'));
                if (sidenav) {
                    sidenav.close();
                }

                // Calculate offset for fixed navbar
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* Navbar Behavior */
function initNavbar() {
    const nav = document.querySelector('nav');
    let lastScrollY = window.scrollY;
    let ticking = false;

    // Change navbar style on scroll
    function updateNavbar() {
        const scrollY = window.scrollY;

        // Add/remove shadow based on scroll
        if (scrollY > 50) {
            nav.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        } else {
            nav.style.boxShadow = '0 1px 3px rgba(0,0,0,0.12)';
        }

        lastScrollY = scrollY;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });

    // Active nav link highlighting
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll('nav ul li a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {

    /* Project Card Hover Effects */
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    /* Project Scroll Buttons */
    const grid = document.querySelector('.projects-grid');
    const btnLeft = document.querySelector('.scroll-left');
    const btnRight = document.querySelector('.scroll-right');

    if (grid && btnLeft && btnRight) {
        const scrollAmount = () => grid.clientWidth * 0.9;

        btnRight.addEventListener('click', () => {
            grid.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
        });

        btnLeft.addEventListener('click', () => {
            grid.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
        });
    }
});

/* Add loading animation */
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

