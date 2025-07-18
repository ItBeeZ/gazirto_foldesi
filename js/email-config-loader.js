// Biztonságos EmailJS konfiguráció betöltő - Éles környezet
// Ez a fájl kezeli az EmailJS konfiguráció betöltését éles környezetben

// Konfiguráció betöltése éles környezetben
function loadEnvironmentConfig() {
    const config = {
        publicKey: null,
        serviceId: null,
        templateId: null
    };
    
    // Betöltjük a production config objektumot
    if (typeof PRODUCTION_CONFIG !== 'undefined') {
        config.publicKey = PRODUCTION_CONFIG.publicKey;
        config.serviceId = PRODUCTION_CONFIG.serviceId;
        config.templateId = PRODUCTION_CONFIG.templateId;
    }
    
    return config;
}

// Konfiguráció validálása
function validateConfig(config) {
    const errors = [];
    
    if (!config.publicKey || config.publicKey.trim().length < 5) {
        errors.push('EmailJS Public Key nincs beállítva vagy túl rövid');
    }
    
    if (!config.serviceId || config.serviceId.trim().length < 5) {
        errors.push('EmailJS Service ID nincs beállítva vagy túl rövid');
    }
    
    if (!config.templateId || config.templateId.trim().length < 5) {
        errors.push('EmailJS Template ID nincs beállítva vagy túl rövid');
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
        return null;
    }
    
    return config;
}

// Exportálás globális scope-ba
window.getSecureEmailConfig = getSecureEmailConfig;

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