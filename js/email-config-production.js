// PRODUCTION EmailJS Configuration
// KRITIKUS: Töltse ki a valódi értékekkel és NE commitolja!

// Konfiguráció beállítása
const PRODUCTION_CONFIG = {
    publicKey: 'LQmZXfAF6e5uPdqvR',
    serviceId: 'service_vllv96u',
    templateId: 'template_b6xvfu9'
};

// Runtime konfiguráció
if (typeof window !== 'undefined') {
    window.EMAILJS_CONFIG = PRODUCTION_CONFIG;
    console.log('✅ EmailJS production konfiguráció betöltve');
}

// Automatikus inicializálás
if (typeof window !== 'undefined') {
    console.log('✅ EmailJS production konfiguráció inicializálva');
}