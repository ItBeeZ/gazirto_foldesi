// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const faqItems = document.querySelectorAll('.faq-item');

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

// Form Validation
function validateField(field, validationFn, errorMessage) {
    const value = field.value.trim();
    const errorElement = document.getElementById(field.name + 'Error');
    
    if (validationFn(value)) {
        field.classList.remove('error');
        field.classList.add('success');
        errorElement.textContent = '';
        return true;
    } else {
        field.classList.remove('success');
        field.classList.add('error');
        errorElement.textContent = errorMessage;
        return false;
    }
}

// Validation Functions
const validators = {
    name: (value) => value.length >= 2,
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    phone: (value) => value === '' || /^[\+]?[0-9\s\-\(\)]{10,}$/.test(value),
    message: (value) => value.length >= 10
};

const errorMessages = {
    name: 'A név legalább 2 karakter hosszú legyen',
    email: 'Kérjük, adjon meg egy érvényes e-mail címet',
    phone: 'Kérjük, adjon meg egy érvényes telefonszámot',
    message: 'Az üzenet legalább 10 karakter hosszú legyen'
};

// Real-time Validation
if (contactForm) {
    const fields = contactForm.querySelectorAll('input, textarea, select');
    
    fields.forEach(field => {
        if (validators[field.name]) {
            field.addEventListener('blur', () => {
                validateField(field, validators[field.name], errorMessages[field.name]);
            });
            
            field.addEventListener('input', () => {
                if (field.classList.contains('error')) {
                    validateField(field, validators[field.name], errorMessages[field.name]);
                }
            });
        }
    });
}

// Form Submission
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validate all fields
        let isValid = true;
        const formData = new FormData(contactForm);
        
        // Check required fields
        const nameField = document.getElementById('name');
        const emailField = document.getElementById('email');
        const messageField = document.getElementById('message');
        
        if (!validateField(nameField, validators.name, errorMessages.name)) isValid = false;
        if (!validateField(emailField, validators.email, errorMessages.email)) isValid = false;
        if (!validateField(messageField, validators.message, errorMessages.message)) isValid = false;
        
        // Validate optional phone field if filled
        const phoneField = document.getElementById('phone');
        if (phoneField.value.trim() !== '') {
            if (!validateField(phoneField, validators.phone, errorMessages.phone)) isValid = false;
        }
        
        if (!isValid) {
            // Scroll to first error
            const firstError = contactForm.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Küldés...';
        
        try {
            // EmailJS inicializálása, ha még nem történt meg
            if (typeof initializeEmailJS === 'function') {
                initializeEmailJS();
            }
            
            // Email küldése EmailJS-sel
            const result = await sendEmailViaEmailJS(formData);
            
            if (result.success) {
                // Hide form and show success message
                contactForm.style.display = 'none';
                formSuccess.classList.add('show');
                
                // Scroll to success message
                formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Reset form for potential future use
                contactForm.reset();
                
                // Remove validation classes
                const fields = contactForm.querySelectorAll('input, textarea, select');
                fields.forEach(field => {
                    field.classList.remove('error', 'success');
                });
                
            } else {
                throw new Error(result.error || 'Ismeretlen hiba történt');
            }
            
        } catch (error) {
            console.error('Form submission error:', error);
            
            // Felhasználóbarát hibaüzenet
            let userMessage = 'Hiba történt az üzenet küldése során. ';
            
            if (error.message.includes('EmailJS nincs betöltve')) {
                userMessage += 'Az email szolgáltatás nem érhető el. Kérjük, próbálja újra később, vagy vegye fel velünk a kapcsolatot telefonon.';
            } else if (error.message.includes('Túl sok kérés')) {
                userMessage += 'Túl sok üzenetet küldött rövid időn belül. Kérjük, várjon néhány percet, majd próbálja újra.';
            } else if (error.message.includes('Hitelesítési hiba')) {
                userMessage += 'Technikai probléma lépett fel. Kérjük, vegye fel velünk a kapcsolatot telefonon.';
            } else {
                userMessage += 'Kérjük, ellenőrizze az internetkapcsolatát és próbálja újra, vagy vegye fel velünk a kapcsolatot telefonon.';
            }
            
            // Hibaüzenet megjelenítése
            const errorDiv = document.createElement('div');
            errorDiv.className = 'form-error';
            errorDiv.innerHTML = `
                <i class="fas fa-exclamation-triangle"></i>
                <p>${userMessage}</p>
                <p><strong>Alternatív elérhetőségek:</strong></p>
                <p>📞 06-30/460-3898</p>
                <p>📧 gazirtokertesz@gmail.com</p>
            `;
            
            // Beszúrjuk a hibaüzenetet a form elé
            contactForm.parentNode.insertBefore(errorDiv, contactForm);
            
            // Scroll to error message
            errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Eltávolítjuk a hibaüzenetet 10 másodperc után
            setTimeout(() => {
                if (errorDiv.parentNode) {
                    errorDiv.parentNode.removeChild(errorDiv);
                }
            }, 10000);
            
        } finally {
            // Reset button state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    });
}

// FAQ Functionality
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all FAQ items
        faqItems.forEach(faqItem => {
            faqItem.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
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
    const animatedElements = document.querySelectorAll(
        '.contact-form-container, .contact-item, .faq-item, .hero-content, .map-container'
    );
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

// Contact Item Hover Effects
document.querySelectorAll('.contact-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-2px) scale(1.02)';
        const icon = item.querySelector('.contact-icon');
        if (icon) {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        }
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) scale(1)';
        const icon = item.querySelector('.contact-icon');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// Social Links Animation
document.querySelectorAll('.social-links a').forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-2px) scale(1.1) rotate(5deg)';
    });
    
    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateY(0) scale(1) rotate(0deg)';
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
        if (this.classList.contains('loading')) return;
        
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
        background: rgba(255, 255, 255, 0.6);
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

// Map Animation
const mapSvg = document.querySelector('.map-svg');
if (mapSvg) {
    const mapObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate the location pin
                const locationPin = mapSvg.querySelector('path[d*="M200 135"]');
                if (locationPin) {
                    locationPin.style.animation = 'bounce 1s ease-in-out 3';
                }
            }
        });
    }, { threshold: 0.5 });
    
    mapObserver.observe(mapSvg);
}

// Add bounce animation for map pin
const bounceStyle = document.createElement('style');
bounceStyle.textContent = `
    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
        }
        40% {
            transform: translateY(-10px);
        }
        60% {
            transform: translateY(-5px);
        }
    }
`;
document.head.appendChild(bounceStyle);



// Form Field Focus Effects
const formFields = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
formFields.forEach(field => {
    field.addEventListener('focus', () => {
        field.parentElement.style.transform = 'translateY(-2px)';
    });
    
    field.addEventListener('blur', () => {
        field.parentElement.style.transform = 'translateY(0)';
    });
});

// Auto-resize textarea
const messageTextarea = document.getElementById('message');
if (messageTextarea) {
    messageTextarea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    });
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

// Keyboard Navigation for FAQ
faqItems.forEach((item, index) => {
    const question = item.querySelector('.faq-question');
    question.setAttribute('tabindex', '0');
    question.setAttribute('role', 'button');
    question.setAttribute('aria-expanded', 'false');
    
    question.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            question.click();
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            const nextIndex = (index + 1) % faqItems.length;
            faqItems[nextIndex].querySelector('.faq-question').focus();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            const prevIndex = (index - 1 + faqItems.length) % faqItems.length;
            faqItems[prevIndex].querySelector('.faq-question').focus();
        }
    });
    
    // Update aria-expanded when item is toggled
    const observer = new MutationObserver(() => {
        const isActive = item.classList.contains('active');
        question.setAttribute('aria-expanded', isActive.toString());
    });
    
    observer.observe(item, { attributes: true, attributeFilter: ['class'] });
});