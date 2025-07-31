document.addEventListener('DOMContentLoaded', function() {
    // Hamburger menü kezelése
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effekt
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Űrlap validáció és adatok összegyűjtése
    const form = document.getElementById('registrationForm');
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const facebookInput = document.getElementById('facebook');
    const facebookError = document.getElementById('facebookError');
    const successMessage = document.getElementById('formSuccess');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Email validáció
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email) {
            emailError.textContent = 'Kérjük, adja meg az email címét!';
            emailInput.classList.add('error');
            return;
        } else if (!emailRegex.test(email)) {
            emailError.textContent = 'Kérjük, adjon meg egy érvényes email címet!';
            emailInput.classList.add('error');
            return;
        } else {
            emailError.textContent = '';
            emailInput.classList.remove('error');
        }
        
        // Facebook URL validáció
        const facebookUrl = facebookInput.value.trim();
        const facebookRegex = /^https:\/\/(www\.)?facebook\.com\/.+$/;
        
        if (!facebookUrl) {
            facebookError.textContent = 'Kérjük, adja meg a Facebook profil URL-jét!';
            facebookInput.classList.add('error');
            return;
        } else if (!facebookRegex.test(facebookUrl)) {
            facebookError.textContent = 'Kérjük, adjon meg egy érvényes Facebook profil URL-t!';
            facebookInput.classList.add('error');
            return;
        } else {
            facebookError.textContent = '';
            facebookInput.classList.remove('error');
        }

        // Adatok előkészítése az API híváshoz
        const registrationData = {
            email: email,
            facebookUrl: facebookUrl
        };

        // Beküldés gomb letiltása a feldolgozás idejére
        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Feldolgozás...';
        
        // API hívás a backend felé
        fetch('https://api.gazirto.hu/api/registrations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registrationData)
        })
        .then(response => response.json())
        .then(data => {
            // Beküldés gomb visszaállítása
            submitButton.disabled = false;
            submitButton.textContent = 'Regisztráció';
            
            if (data.success) {
                // Sikeres regisztráció esetén
                form.reset();
                form.style.display = 'none';
                successMessage.classList.add('show');
            } else {
                // Hiba esetén (pl. már regisztrált email vagy Facebook profil)
                if (data.message && data.message.includes('email')) {
                    emailError.textContent = data.message;
                    emailInput.classList.add('error');
                } else {
                    facebookError.textContent = data.message || 'Hiba történt a regisztráció során';
                    facebookInput.classList.add('error');
                }
            }
        })
        .catch(error => {
            // Hálózati vagy egyéb hiba esetén
            console.error('Regisztrációs hiba:', error);
            submitButton.disabled = false;
            submitButton.textContent = 'Regisztráció';
            emailError.textContent = 'Hálózati hiba történt, kérjük próbálja újra később';
            emailInput.classList.add('error');
        });
    });

    // Input mezők focus/blur effektek
    emailInput.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });

    emailInput.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
    });
    
    facebookInput.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });

    facebookInput.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
    });

    // Aktuális év beállítása a láblécben
    document.getElementById('current-year').textContent = new Date().getFullYear();
});