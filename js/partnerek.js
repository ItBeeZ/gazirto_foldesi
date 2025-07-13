// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile Navigation Toggle
hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
    });
});

// Dynamic Navbar Background
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Initial animation for partner cards
document.addEventListener('DOMContentLoaded', () => {
    const partnerCards = document.querySelectorAll('.partner-card');
    partnerCards.forEach((card, cardIndex) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, cardIndex * 100);
    });
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Set current year in footer
function setCurrentYear() {
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }
}

// Observe elements for animations
document.addEventListener('DOMContentLoaded', () => {
    // Set current year
    setCurrentYear();
    const animatedElements = document.querySelectorAll('.partner-card, .benefit-card, .hero-content, .cta-content');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Smooth Scrolling for Navigation Links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
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

// Partner Card Hover Effects
document.querySelectorAll('.partner-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
        
        // Animate features
        const features = card.querySelectorAll('.feature');
        features.forEach((feature, index) => {
            setTimeout(() => {
                feature.style.transform = 'translateX(5px)';
                feature.querySelector('i').style.transform = 'scale(1.2)';
            }, index * 50);
        });
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
        
        // Reset features
        const features = card.querySelectorAll('.feature');
        features.forEach(feature => {
            feature.style.transform = 'translateX(0)';
            feature.querySelector('i').style.transform = 'scale(1)';
        });
    });
});

// Benefit Card Hover Effects
document.querySelectorAll('.benefit-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px) scale(1.02)';
        const icon = card.querySelector('.benefit-icon');
        if (icon) {
            icon.style.transform = 'scale(1.1) rotate(-5deg)';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
        const icon = card.querySelector('.benefit-icon');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Loading Animation for Hero Section
window.addEventListener('load', () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'all 1s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
});

// Stagger Animation for Navigation Items
window.addEventListener('load', () => {
    const navItems = document.querySelectorAll('.nav-link');
    navItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 100 * index);
    });
});

// Button Click Animation with Ripple Effect
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple CSS dynamically
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(22, 163, 74, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Scroll Progress Indicator
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
};

// Initialize scroll progress
createScrollProgress();

// Smooth Reveal Animation for Footer
const footer = document.querySelector('.footer');
if (footer) {
    const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const footerSections = footer.querySelectorAll('.footer-section');
                footerSections.forEach((section, index) => {
                    setTimeout(() => {
                        section.style.opacity = '1';
                        section.style.transform = 'translateY(0)';
                    }, index * 200);
                });
            }
        });
    }, { threshold: 0.1 });
    
    // Initially hide footer sections
    const footerSections = footer.querySelectorAll('.footer-section');
    footerSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease';
    });
    
    footerObserver.observe(footer);
}

// Removed tab button hover effects as tabs are no longer used

// Partner Card Click Animation
document.querySelectorAll('.partner-card').forEach(card => {
    card.addEventListener('click', () => {
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = 'translateY(-10px) scale(1)';
        }, 150);
    });
});

// Removed tab initialization as tabs are no longer used

// Removed keyboard navigation for tabs as tabs are no longer used

// Partner Logo Animation on Scroll
const partnerLogos = document.querySelectorAll('.partner-logo');
const logoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const logo = entry.target.querySelector('.partner-svg');
            if (logo) {
                logo.style.transform = 'scale(1.1) rotate(360deg)';
                setTimeout(() => {
                    logo.style.transform = 'scale(1) rotate(0deg)';
                }, 800);
            }
        }
    });
}, { threshold: 0.5 });

partnerLogos.forEach(logo => {
    logoObserver.observe(logo);
});

// Benefits Section Counter Animation
const benefitCards = document.querySelectorAll('.benefit-card');
const benefitObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const card = entry.target;
            card.style.transform = 'translateY(0) scale(1)';
            card.style.opacity = '1';
        }
    });
}, { threshold: 0.3 });

benefitCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px) scale(0.9)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    benefitObserver.observe(card);
});

// CTA Section Animation
const ctaSection = document.querySelector('.cta-section');
if (ctaSection) {
    const ctaObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const ctaContent = entry.target.querySelector('.cta-content');
                if (ctaContent) {
                    ctaContent.style.transform = 'scale(1)';
                    ctaContent.style.opacity = '1';
                }
            }
        });
    }, { threshold: 0.3 });
    
    const ctaContent = ctaSection.querySelector('.cta-content');
    if (ctaContent) {
        ctaContent.style.opacity = '0';
        ctaContent.style.transform = 'scale(0.9)';
        ctaContent.style.transition = 'all 0.8s ease';
    }
    
    ctaObserver.observe(ctaSection);
}

// Performance optimization: Throttle scroll events
let ticking = false;

function updateOnScroll() {
    // Navbar background update
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
    
    // Parallax effect
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
});

// Social Links Animation
const socialLinks = document.querySelectorAll('.social-links a');
socialLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-2px) scale(1.1)';
    });
    
    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateY(0) scale(1)';
    });
});