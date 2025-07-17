// Typing Effect for Hero Titles
class TypingEffect {
    constructor(element, text, options = {}) {
        this.element = element;
        this.text = text;
        this.speed = options.speed || 100;
        this.delay = options.delay || 500;
        this.cursor = options.cursor !== false;
        this.cursorChar = options.cursorChar || '|';
        this.loop = options.loop || false;
        
        this.currentIndex = 0;
        this.isTyping = false;
        this.cursorElement = null;
        
        this.init();
    }
    
    init() {
        // Store original text
        this.originalText = this.text;
        
        // Clear element
        this.element.innerHTML = '';
        
        // Add cursor if enabled
        if (this.cursor) {
            this.cursorElement = document.createElement('span');
            this.cursorElement.className = 'typing-cursor';
            this.cursorElement.textContent = this.cursorChar;
            this.element.appendChild(this.cursorElement);
        }
        
        // Start typing after delay
        setTimeout(() => {
            this.startTyping();
        }, this.delay);
    }
    
    startTyping() {
        if (this.isTyping) return;
        
        this.isTyping = true;
        this.currentIndex = 0;
        
        const typeInterval = setInterval(() => {
            if (this.currentIndex < this.text.length) {
                // Add character before cursor
                const char = this.text.charAt(this.currentIndex);
                const textNode = document.createTextNode(char);
                
                if (this.cursor && this.cursorElement) {
                    this.element.insertBefore(textNode, this.cursorElement);
                } else {
                    this.element.appendChild(textNode);
                }
                
                this.currentIndex++;
            } else {
                clearInterval(typeInterval);
                this.isTyping = false;
                
                // Remove cursor after typing is complete
                if (this.cursor && this.cursorElement) {
                    setTimeout(() => {
                        if (this.cursorElement && this.cursorElement.parentNode) {
                            this.cursorElement.remove();
                        }
                    }, 1000);
                }
                
                // Loop if enabled
                if (this.loop) {
                    setTimeout(() => {
                        this.reset();
                        this.startTyping();
                    }, 2000);
                }
            }
        }, this.speed);
    }
    
    reset() {
        this.element.innerHTML = '';
        this.currentIndex = 0;
        this.isTyping = false;
        
        if (this.cursor) {
            this.cursorElement = document.createElement('span');
            this.cursorElement.className = 'typing-cursor';
            this.cursorElement.textContent = this.cursorChar;
            this.element.appendChild(this.cursorElement);
        }
    }
    
    destroy() {
        this.element.innerHTML = this.originalText;
        this.isTyping = false;
    }
}

// CSS for typing cursor
const typingStyles = document.createElement('style');
typingStyles.textContent = `
    .typing-cursor {
        animation: blink 1s infinite;
        font-weight: normal;
    }
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
`;
document.head.appendChild(typingStyles);

// Auto-initialize typing effect for hero h1 elements
document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('.hero-content h1');
    
    if (heroTitle && heroTitle.textContent.trim()) {
        const originalText = heroTitle.textContent.trim();
        
        // Apply typing effect to all pages
        new TypingEffect(heroTitle, originalText, {
            speed: 80,
            delay: 800,
            cursor: true
        });
    }
});

// Export for manual use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TypingEffect;
}
if (typeof window !== 'undefined') {
    window.TypingEffect = TypingEffect;
}