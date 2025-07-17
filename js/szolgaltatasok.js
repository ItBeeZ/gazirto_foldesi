// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    }
});

// Intersection Observer for fade-in animations
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

// Add fade-in class to service details and observe them
const serviceDetails = document.querySelectorAll('.service-detail');
serviceDetails.forEach((detail, index) => {
    detail.classList.add('fade-in');
    detail.style.animationDelay = `${index * 0.2}s`;
    observer.observe(detail);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add hover effects to service details
serviceDetails.forEach(detail => {
    detail.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px)';
        this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.15)';
    });
    
    detail.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(-10px)';
        this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
    });
});

// Add parallax effect to service images
window.addEventListener('scroll', () => {
    const serviceImages = document.querySelectorAll('.service-svg');
    const scrolled = window.pageYOffset;
    
    serviceImages.forEach((image, index) => {
        const rate = scrolled * 0.1 * (index % 2 === 0 ? 1 : -1);
        image.style.transform = `translateY(${rate}px)`;
    });
});

// Add loading animation to hero section
const hero = document.querySelector('.hero');
if (hero) {
    hero.style.opacity = '0';
    hero.style.transform = 'translateY(30px)';
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            hero.style.transition = 'all 1s ease';
            hero.style.opacity = '1';
            hero.style.transform = 'translateY(0)';
        }, 100);
    });
}

// Set current year in footer
function setCurrentYear() {
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }
}

// Add stagger animation to navigation items
document.addEventListener('DOMContentLoaded', function() {
    // Set current year
    setCurrentYear();
    const navItems = document.querySelectorAll('.nav-link');
    navItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 200 + (index * 100));
    });
});

// Add click animation to CTA button
const ctaButton = document.querySelector('.cta .btn');
if (ctaButton) {
    ctaButton.addEventListener('click', function(e) {
        // Create ripple effect
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
}

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
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
document.head.appendChild(style);

// Add scroll progress indicator
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #16a34a, #22c55e);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {

        const scrollTop = window.pageYOffset;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
};

// Initialize scroll progress
createScrollProgress();

// Footer is now visible by default without animation

// Image Gallery Functionality
class ImageGallery {
    constructor(galleryElement) {
        this.gallery = galleryElement;
        this.images = galleryElement.querySelectorAll('.gallery-image');
        this.dots = galleryElement.querySelectorAll('.dot');
        this.currentIndex = 0;
        this.autoPlayInterval = null;
        this.isVisible = false;
        
        this.init();
    }
    
    init() {
        // Add click events to dots
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToSlide(index);
                this.resetAutoPlay();
            });
        });
        
        // Pause autoplay on hover
        this.gallery.addEventListener('mouseenter', () => {
            this.pauseAutoPlay();
        });
        
        this.gallery.addEventListener('mouseleave', () => {
            if (this.isVisible) {
                this.startAutoPlay();
            }
        });
        
        // Setup intersection observer for autoplay
        this.setupIntersectionObserver();
    }
    
    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.isVisible = true;
                    this.startAutoPlay();
                } else {
                    this.isVisible = false;
                    this.pauseAutoPlay();
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(this.gallery);
    }
    
    goToSlide(index) {
        // Remove active class from current image and dot
        this.images[this.currentIndex].classList.remove('active');
        this.dots[this.currentIndex].classList.remove('active');
        
        // Set new current index
        this.currentIndex = index;
        
        // Add active class to new image and dot
        this.images[this.currentIndex].classList.add('active');
        this.dots[this.currentIndex].classList.add('active');
    }
    
    nextSlide() {
        const nextIndex = (this.currentIndex + 1) % this.images.length;
        this.goToSlide(nextIndex);
    }
    
    startAutoPlay() {
        this.pauseAutoPlay(); // Clear any existing interval
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 1500); // Change image every 2 seconds
    }
    
    pauseAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
    
    resetAutoPlay() {
        if (this.isVisible) {
            this.startAutoPlay();
        }
    }
}

// Initialize all galleries
document.addEventListener('DOMContentLoaded', function() {
    const galleries = document.querySelectorAll('.image-gallery');
    galleries.forEach(gallery => {
        new ImageGallery(gallery);
    });
});

// Add touch/swipe support for mobile
class TouchHandler {
    constructor(gallery) {
        this.gallery = gallery;
        this.startX = 0;
        this.endX = 0;
        this.threshold = 50; // Minimum swipe distance
        
        this.init();
    }
    
    init() {
        this.gallery.addEventListener('touchstart', (e) => {
            this.startX = e.touches[0].clientX;
        }, { passive: true });
        
        this.gallery.addEventListener('touchend', (e) => {
            this.endX = e.changedTouches[0].clientX;
            this.handleSwipe();
        }, { passive: true });
    }
    
    handleSwipe() {
        const distance = this.startX - this.endX;
        
        if (Math.abs(distance) > this.threshold) {
            const galleryInstance = this.gallery.galleryInstance;
            if (galleryInstance) {
                if (distance > 0) {
                    // Swipe left - next image
                    galleryInstance.nextSlide();
                } else {
                    // Swipe right - previous image
                    const prevIndex = (galleryInstance.currentIndex - 1 + galleryInstance.images.length) % galleryInstance.images.length;
                    galleryInstance.goToSlide(prevIndex);
                }
                galleryInstance.resetAutoPlay();
            }
        }
    }
}

// Initialize touch handlers and link them to galleries
document.addEventListener('DOMContentLoaded', function() {
    const galleries = document.querySelectorAll('.image-gallery');
    galleries.forEach(gallery => {
        const galleryInstance = new ImageGallery(gallery);
        gallery.galleryInstance = galleryInstance; // Store reference for touch handler
        new TouchHandler(gallery);
    });
});