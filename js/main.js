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

    // 7. Live Open/Closed Status
    // Hours: Mon–Fri 7:30–17:00, Sat 7:30–12:00, Sun closed (Central Time)
    const statusDot = document.querySelector('.status-dot');
    const statusValue = statusDot ? statusDot.closest('.stat-item').querySelector('.stat-value') : null;
    const statusSub = statusDot ? statusDot.closest('.stat-item').querySelector('.stat-sub') : null;

    if (statusDot && statusValue && statusSub) {
        // Get current time in US Central (handles CST/CDT automatically)
        const now = new Date();
        const centralTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Chicago' }));
        const day = centralTime.getDay(); // 0=Sun, 1=Mon...6=Sat
        const h = centralTime.getHours();
        const m = centralTime.getMinutes();
        const mins = h * 60 + m;

        let isOpen = false;
        let closingMsg = '';

        if (day >= 1 && day <= 5) {
            // Mon–Fri: 7:30–17:00
            isOpen = mins >= 450 && mins < 1020;
            if (isOpen) closingMsg = 'Closing at 5:00 PM';
            else if (mins < 450) closingMsg = 'Opens at 7:30 AM';
            else closingMsg = 'Opens Mon at 7:30 AM';
        } else if (day === 6) {
            // Saturday: 7:30–12:00
            isOpen = mins >= 450 && mins < 720;
            if (isOpen) closingMsg = 'Closing at 12:00 PM';
            else if (mins < 450) closingMsg = 'Opens at 7:30 AM';
            else closingMsg = 'Opens Mon at 7:30 AM';
        } else {
            // Sunday
            closingMsg = 'Opens Mon at 7:30 AM';
        }

        if (isOpen) {
            statusDot.style.background = '#22c55e';
            statusDot.style.boxShadow = '0 0 10px #22c55e';
            statusValue.textContent = 'OPEN NOW';
            statusSub.textContent = closingMsg;
        } else {
            statusDot.style.background = '#ef4444';
            statusDot.style.boxShadow = '0 0 10px #ef4444';
            statusValue.textContent = 'CLOSED';
            statusSub.textContent = closingMsg;
        }
    }

    // 8. Update Google Review links to use correct Place ID
    document.querySelectorAll('a[href*="google.com/maps/place/Avoyelles"]').forEach(link => {
        link.href = 'https://search.google.com/local/writereview?placeid=ChIJFzH6H6qPJIYR7M2_eH7Z1w8';
    });
});
