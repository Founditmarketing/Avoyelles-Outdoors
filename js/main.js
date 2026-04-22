/* 🌿 AVOYELLES OUTDOORS INC. — VANILLA JS LOGIC */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Navigation Scroll Behavior
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Scroll-Reveal Animations (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // 3. Mobile Hamburger Menu
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    // Create mobile menu overlay if not present (optional, or just toggle class)
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            // This is a simple toggle. In a real app, you might want a full screen overlay.
            // For now, let's just toggle a class on the body or nav
            document.body.classList.toggle('nav-open');
            // Animate hamburger to X (handled in CSS transform if classes are applied)
        });
    }

    // 4. Active Page Highlighting
    const currentPath = window.location.pathname;
    const navItems = document.querySelectorAll('.nav-link');
    
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (currentPath.includes(href) && href !== 'index.html') {
            item.classList.add('active');
        } else if (currentPath === '/' || currentPath.includes('index.html')) {
            if (href === 'index.html') item.classList.add('active');
        }
    });

    // 5. Form Validation (Contact Page)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (!name || !email || !message) {
                e.preventDefault();
                alert('Please fill in all required fields.');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                e.preventDefault();
                alert('Please enter a valid email address.');
            }
        });
    }

    // 6. Current Year in Footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
