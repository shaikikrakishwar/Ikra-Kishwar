document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    const backToTopBtn = document.querySelector('.back-to-top');
    const contactForm = document.getElementById('contact-form');
    const formSuccessMessage = document.querySelector('.form-success-message');
    const skillProgressBars = document.querySelectorAll('.progress');
    const floatingBtns = document.querySelectorAll('.floating-btn');
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    // Typewriter effect
    const typewriterText = document.getElementById('typewriter-text');
    const phrases = [
        'Full-Stack Developer',
        'React Developer',
        'Java Programmer',
        'UI/UX Enthusiast'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typewriterDelay = 100;
    
    function typeWriter() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typewriterText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typewriterDelay = 50;
        } else {
            typewriterText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typewriterDelay = 100;
        }
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typewriterDelay = 1000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typewriterDelay = 500; // Pause before typing next phrase
        }
        
        setTimeout(typeWriter, typewriterDelay);
    }
    
    // Start typewriter effect
    setTimeout(typeWriter, 1000);
    
    // Theme toggle functionality
    function setTheme(isDark) {
        if (isDark) {
            body.className = 'dark-mode';
            localStorage.setItem('theme', 'dark');
        } else {
            body.className = 'light-mode';
            localStorage.setItem('theme', 'light');
        }
    }
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        themeToggle.checked = true;
        setTheme(true);
    } else {
        themeToggle.checked = false;
        setTheme(false);
    }
    
    // Theme toggle event listener
    themeToggle.addEventListener('change', () => {
        setTheme(themeToggle.checked);
    });
    
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Sticky navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = 'none';
        }
        
        // Show/hide back to top button
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
        
        // Active nav link based on scroll position
        const sections = document.querySelectorAll('section');
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
    
    // Back to top button
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Theme toggle functionality
    themeToggle.addEventListener('click', (e) => {
        e.preventDefault();
        body.classList.toggle('dark-mode');
        
        // Change icon based on theme
        const themeIcon = themeToggle.querySelector('i');
        
        // Update particles colors if particles.js is loaded
        if (window.pJSDom && window.pJSDom.length > 0) {
            const highlightColor = getComputedStyle(document.documentElement).getPropertyValue('--highlight').trim();
            window.pJSDom[0].pJS.particles.color.value = highlightColor;
            window.pJSDom[0].pJS.particles.line_linked.color = highlightColor;
            window.pJSDom[0].pJS.fn.particlesRefresh();
        }
        if (body.classList.contains('dark-mode')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
        
        // Save preference to localStorage
        localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
    });
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        const themeIcon = themeToggle.querySelector('i');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    
    // Floating buttons animation
    floatingBtns.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.animation = 'pulse 1s infinite';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.animation = 'none';
        });
    });
    
    // Custom cursor functionality
    if (cursor && cursorFollower) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            // Add slight delay to follower for smooth effect
            setTimeout(() => {
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
            }, 50);
        });
        
        // Change cursor size on clickable elements
        document.querySelectorAll('a, button, .btn, .project-card, .skill-card').forEach(item => {
            item.addEventListener('mouseenter', () => {
                cursor.style.width = '15px';
                cursor.style.height = '15px';
                cursor.style.backgroundColor = 'var(--secondary-color)';
                cursorFollower.style.width = '50px';
                cursorFollower.style.height = '50px';
                cursorFollower.style.borderColor = 'var(--secondary-color)';
            });
            
            item.addEventListener('mouseleave', () => {
                cursor.style.width = '20px';
                cursor.style.height = '20px';
                cursor.style.backgroundColor = 'var(--highlight)';
                cursorFollower.style.width = '40px';
                cursorFollower.style.height = '40px';
                cursorFollower.style.borderColor = 'var(--highlight)';
            });
        });
        
        // Hide cursor when mouse leaves window
        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
            cursorFollower.style.opacity = '0';
        });
        
        document.addEventListener('mouseenter', () => {
            cursor.style.opacity = '0.7';
            cursorFollower.style.opacity = '0.5';
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            if (name && email && subject && message) {
                // In a real application, you would send the form data to a server here
                // For demo purposes, we'll just show the success message
                
                // Show success message
                formSuccessMessage.classList.add('show');
                
                // Reset form
                contactForm.reset();
                
                // Hide success message after 3 seconds
                setTimeout(() => {
                    formSuccessMessage.classList.remove('show');
                }, 3000);
            }
        });
    }
    
    // Animate skill progress bars on scroll
    const animateProgressBars = () => {
        skillProgressBars.forEach(bar => {
            const barTop = bar.getBoundingClientRect().top;
            if (barTop < window.innerHeight - 100) {
                bar.style.width = bar.parentElement.getAttribute('data-progress') || bar.style.width;
            }
        });
    };
    
    // Set initial width to 0 for animation
    skillProgressBars.forEach(bar => {
        const width = bar.style.width;
        bar.parentElement.setAttribute('data-progress', width);
        bar.style.width = '0';
    });
    
    // Scroll reveal animation
    const scrollReveal = () => {
        const revealElements = document.querySelectorAll('.skill-card, .timeline-item, .project-card, .certification-card, .achievement-card');
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('show');
            }
        });
        
        // Also animate progress bars
        animateProgressBars();
    };
    
    // Add 3D tilt effect to profile image
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        profileImage.addEventListener('mousemove', (e) => {
            const rect = profileImage.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const tiltX = (y - centerY) / 10;
            const tiltY = (centerX - x) / 10;
            
            profileImage.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.05)`;
        });
        
        profileImage.addEventListener('mouseleave', () => {
            profileImage.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    }
    
    // Add show class for CSS animations
    document.querySelectorAll('.skill-card, .timeline-item, .project-card, .certification-card, .achievement-card').forEach(element => {
        element.classList.add('reveal');
    });
    
    // Run scroll reveal on load and scroll
    window.addEventListener('scroll', scrollReveal);
    window.addEventListener('load', scrollReveal);
    
    // Create SVG placeholder images for projects
    function createProjectSVGs() {
        // E-commerce SVG
        const ecommerceSVG = `
        <svg width="100%" height="100%" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="ecomm-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#4361ee" />
                    <stop offset="100%" stop-color="#7209b7" />
                </linearGradient>
            </defs>
            <rect width="800" height="600" fill="#f8f9fa" />
            <g transform="translate(100, 100)">
                <rect x="0" y="0" width="600" height="400" rx="20" fill="url(#ecomm-grad)" opacity="0.2" />
                <rect x="50" y="50" width="200" height="200" rx="10" fill="url(#ecomm-grad)" opacity="0.7" />
                <rect x="300" y="50" width="250" height="50" rx="5" fill="url(#ecomm-grad)" opacity="0.5" />
                <rect x="300" y="120" width="250" height="20" rx="5" fill="url(#ecomm-grad)" opacity="0.3" />
                <rect x="300" y="160" width="150" height="20" rx="5" fill="url(#ecomm-grad)" opacity="0.3" />
                <rect x="300" y="200" width="100" height="40" rx="20" fill="url(#ecomm-grad)" />
                <rect x="50" y="300" width="500" height="50" rx="5" fill="url(#ecomm-grad)" opacity="0.2" />
            </g>
        </svg>
        `;
        
        // Finance SVG
        const financeSVG = `
        <svg width="100%" height="100%" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="finance-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#4cc9f0" />
                    <stop offset="100%" stop-color="#4361ee" />
                </linearGradient>
            </defs>
            <rect width="800" height="600" fill="#f8f9fa" />
            <g transform="translate(100, 100)">
                <rect x="0" y="0" width="600" height="400" rx="20" fill="url(#finance-grad)" opacity="0.2" />
                <path d="M50,350 L150,250 L250,300 L350,200 L450,250 L550,150" stroke="url(#finance-grad)" stroke-width="5" fill="none" />
                <circle cx="50" cy="350" r="8" fill="url(#finance-grad)" />
                <circle cx="150" cy="250" r="8" fill="url(#finance-grad)" />
                <circle cx="250" cy="300" r="8" fill="url(#finance-grad)" />
                <circle cx="350" cy="200" r="8" fill="url(#finance-grad)" />
                <circle cx="450" cy="250" r="8" fill="url(#finance-grad)" />
                <circle cx="550" cy="150" r="8" fill="url(#finance-grad)" />
                <rect x="50" y="50" width="200" height="100" rx="10" fill="url(#finance-grad)" opacity="0.5" />
                <rect x="350" y="50" width="200" height="100" rx="10" fill="url(#finance-grad)" opacity="0.3" />
            </g>
        </svg>
        `;
        
        // Create directory if it doesn't exist
        const createImagesDir = async () => {
            try {
                // In a real environment, you would create the directory server-side
                // For this demo, we'll just create the SVG elements directly
                const ecommerceImg = document.querySelector('img[alt="E-commerce Website Project"]');
                const financeImg = document.querySelector('img[alt="Personal Finance Tracker Project"]');
                
                if (ecommerceImg) {
                    ecommerceImg.outerHTML = ecommerceSVG;
                }
                
                if (financeImg) {
                    financeImg.outerHTML = financeSVG;
                }
            } catch (error) {
                console.error('Error creating SVG images:', error);
            }
        };
        
        createImagesDir();
    }
    
    // Create SVG images
    createProjectSVGs();
});