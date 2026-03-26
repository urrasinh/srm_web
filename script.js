document.addEventListener('DOMContentLoaded', () => {

    // ── Mobile Menu ───────────────────────────────────────────────
    const toggle   = document.querySelector('.mobile-toggle');
    const menu     = document.querySelector('.mobile-menu');
    const menuLinks = document.querySelectorAll('.mobile-links a');

    function toggleMenu() {
        const open = menu.classList.toggle('active');
        toggle.classList.toggle('active', open);
        document.body.style.overflow = open ? 'hidden' : '';
    }

    if (toggle) toggle.addEventListener('click', toggleMenu);
    menuLinks.forEach(link => link.addEventListener('click', toggleMenu));

    // ── Header scroll state ────────────────────────────────────────
    const header = document.getElementById('header');

    // On subpages the header is pre-classed as .scrolled; skip scroll toggle.
    if (header && !header.classList.contains('scrolled')) {
        function onScroll() {
            header.classList.toggle('scrolled', window.scrollY > 60);
        }
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    // ── Active nav link on scroll (home page only) ─────────────────
    const sections  = document.querySelectorAll('section[id]');
    const navLinks  = document.querySelectorAll('.nav-link');

    if (sections.length && navLinks.length) {
        function updateActive() {
            let current = '';
            sections.forEach(s => {
                if (window.scrollY >= s.offsetTop - 200) current = s.id;
            });
            navLinks.forEach(link => {
                const href = link.getAttribute('href');
                link.classList.toggle('active', href.includes(`#${current}`) || href.includes(current));
            });
        }
        window.addEventListener('scroll', updateActive, { passive: true });
    }

    // ── Scroll reveal ──────────────────────────────────────────────
    const reveals = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });

    reveals.forEach(el => observer.observe(el));

    // ── Smooth anchor scroll ──────────────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            const offset = 80;
            window.scrollTo({
                top: target.getBoundingClientRect().top + window.pageYOffset - offset,
                behavior: 'smooth'
            });
        });
    });

});
