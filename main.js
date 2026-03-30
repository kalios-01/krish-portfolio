document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const podcastCard = document.getElementById('podcastCard');
    const portfolioItems = document.getElementById('portfolioItems');
    let isRevealed = false;

    const videoIds = ['rlDdSkxAkGc', 'hpKeWOdIDj8', '7Dhp7JERS8w', 'C7tRXzgu1J4'];

    function getYouTubeThumbnail(videoId) {
        return `https://img.youtube.com/vi/${videoId}/sddefault.jpg`;
    }

    function loadThumbnails() {
        const portfolioCardElements = document.querySelectorAll('.portfolio-item');
        portfolioCardElements.forEach((item) => {
            const videoId = item.getAttribute('data-video-id');
            const views = item.getAttribute('data-views');
            const img = item.querySelector('.portfolio-thumbnail');
            const viewsDiv = item.querySelector('.views');

            img.src = getYouTubeThumbnail(videoId);
            img.alt = `Video ${videoId} thumbnail`;
            viewsDiv.textContent = views;
        });
    }

    function setActiveLink() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', setActiveLink);
    setActiveLink();

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    podcastCard.addEventListener('click', () => {
        if (!isRevealed) {
            portfolioItems.classList.add('revealed');
            isRevealed = true;
            loadThumbnails();
        } else {
            portfolioItems.classList.remove('revealed');
            isRevealed = false;
        }
    });

    loadThumbnails();

    const submitBtn = document.querySelector('.submit-btn');
    const formInputs = document.querySelectorAll('.form-input');
    const formTextarea = document.querySelector('.form-textarea');

    if (submitBtn) {
        submitBtn.addEventListener('click', (e) => {
            e.preventDefault();

            const name = formInputs[0]?.value.trim();
            const email = formInputs[1]?.value.trim();
            const message = formTextarea?.value.trim();

            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }

            if (!isValidEmail(email)) {
                alert('Please enter a valid email address');
                return;
            }

            alert('Thank you for your message! I will get back to you soon.');

            formInputs.forEach(input => input.value = '');
            if (formTextarea) formTextarea.value = '';
        });
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.work-card, .contact-item, .skill-tag');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
