// Biztonságos EmailJS konfiguráció betöltő
// Ez a fájl kezeli a környezeti változók betöltését és a fallback konfigurációt

// Környezeti változók betöltése (ha elérhető)
function loadEnvironmentConfig() {
    // Browser környezetben a környezeti változók nem érhetők el közvetlenül
    // Ezért egy alternatív megoldást használunk
    
    // 1. Próbáljuk betölteni a .env fájlból (fejlesztési környezet)
    // 2. Használjunk fallback konfigurációt éles környezetben
    
    const config = {
        publicKey: null,
        serviceId: null,
        templateId: null
    };
    
    // Ellenőrizzük, hogy van-e beállított konfiguráció a window objektumban
    // (ezt a szerver oldali script állíthatja be)
    if (window.EMAILJS_CONFIG) {
        config.publicKey = window.EMAILJS_CONFIG.publicKey;
        config.serviceId = window.EMAILJS_CONFIG.serviceId;
        config.templateId = window.EMAILJS_CONFIG.templateId;
    }
    
    // Ha nincs window konfiguráció, próbáljuk a localStorage-ból
    // (fejlesztési célokra)
    if (!config.publicKey) {
        config.publicKey = localStorage.getItem('EMAILJS_PUBLIC_KEY');
        config.serviceId = localStorage.getItem('EMAILJS_SERVICE_ID');
        config.templateId = localStorage.getItem('EMAILJS_TEMPLATE_ID');
    }
    
    return config;
}

// Konfiguráció validálása
function validateConfig(config) {
    const errors = [];
    
    if (!config.publicKey || config.publicKey === 'YOUR_ACTUAL_PUBLIC_KEY_HERE') {
        errors.push('EmailJS Public Key nincs beállítva');
    }
    
    if (!config.serviceId || config.serviceId === 'YOUR_ACTUAL_SERVICE_ID_HERE') {
        errors.push('EmailJS Service ID nincs beállítva');
    }
    
    if (!config.templateId || config.templateId === 'YOUR_ACTUAL_TEMPLATE_ID_HERE') {
        errors.push('EmailJS Template ID nincs beállítva');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

// Biztonságos konfiguráció betöltése
function getSecureEmailConfig() {
    const config = loadEnvironmentConfig();
    const validation = validateConfig(config);
    
    if (!validation.isValid) {
        console.error('EmailJS konfiguráció hibák:', validation.errors);
        
        // Fejlesztési környezetben részletes hibaüzenet
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.warn('Fejlesztési környezet észlelve. Ellenőrizze a következőket:');
            console.warn('1. .env fájl létezik és tartalmazza a helyes értékeket');
            console.warn('2. localStorage tartalmazza a szükséges kulcsokat');
            console.warn('3. window.EMAILJS_CONFIG objektum be van állítva');
        }
        
        return null;
    }
    
    return config;
}

// Fejlesztési segédfüggvények
function setDevelopmentConfig(publicKey, serviceId, templateId) {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        localStorage.setItem('EMAILJS_PUBLIC_KEY', publicKey);
        localStorage.setItem('EMAILJS_SERVICE_ID', serviceId);
        localStorage.setItem('EMAILJS_TEMPLATE_ID', templateId);
        console.log('Fejlesztési konfiguráció beállítva localStorage-ban');
    } else {
        console.warn('setDevelopmentConfig csak fejlesztési környezetben használható');
    }
}

// Konfiguráció törlése (biztonsági célokra)
function clearStoredConfig() {
    localStorage.removeItem('EMAILJS_PUBLIC_KEY');
    localStorage.removeItem('EMAILJS_SERVICE_ID');
    localStorage.removeItem('EMAILJS_TEMPLATE_ID');
    console.log('Tárolt konfiguráció törölve');
}

// Exportálás globális scope-ba
window.getSecureEmailConfig = getSecureEmailConfig;
window.setDevelopmentConfig = setDevelopmentConfig;
window.clearStoredConfig = clearStoredConfig;

// Automatikus konfiguráció betöltés oldal betöltéskor
document.addEventListener('DOMContentLoaded', function() {
    const config = getSecureEmailConfig();
    if (config) {
        console.log('EmailJS konfiguráció sikeresen betöltve');
        // Beállítjuk a globális konfigurációt
        window.SECURE_EMAIL_CONFIG = config;
    } else {
        console.error('EmailJS konfiguráció betöltése sikertelen');
    }
});