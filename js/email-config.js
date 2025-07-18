// EmailJS Configuration
// FIGYELEM: Ez a fájl már nem tartalmaz érzékeny adatokat!
// A konfigurációt a email-config-loader.js tölti be biztonságosan

// Dinamikus konfiguráció betöltése
function getEmailConfig() {
    // Próbáljuk betölteni a biztonságos konfigurációt
    if (window.SECURE_EMAIL_CONFIG) {
        return window.SECURE_EMAIL_CONFIG;
    }
    
    // Fallback: próbáljuk újra betölteni
    if (typeof getSecureEmailConfig === 'function') {
        const config = getSecureEmailConfig();
        if (config) {
            window.SECURE_EMAIL_CONFIG = config;
            return config;
        }
    }
    
    // Ha minden más sikertelen, hibát dobunk
    throw new Error('EmailJS konfiguráció nem érhető el. Ellenőrizze a beállításokat.');
}

// Template paraméterek mapping
// Ezeket a neveket használja az EmailJS template-ben:
const TEMPLATE_PARAMS = {
    from_name: 'name',        // {{from_name}} a template-ben
    from_email: 'email',      // {{from_email}} a template-ben
    phone: 'phone',           // {{phone}} a template-ben
    service: 'service',       // {{service}} a template-ben
    message: 'message',       // {{message}} a template-ben
    subject: 'subject',       // {{subject}} a template-ben
    time: 'time',             // {{time}} a template-ben
    to_name: 'Gázirtó Kertész', // {{to_name}} a template-ben
    reply_to: 'email'         // {{reply_to}} a template-ben
};

// Rate limiting változók
let lastEmailSent = 0;
const EMAIL_COOLDOWN = 60000; // 1 perc várakozás két email között
let emailAttempts = 0;
const MAX_ATTEMPTS_PER_SESSION = 3; // Maximum 3 próbálkozás session-ként

// EmailJS inicializálása
function initializeEmailJS() {
    try {
        // Ellenőrizzük, hogy az EmailJS be van-e töltve
        if (typeof emailjs === 'undefined') {
            throw new Error('EmailJS nincs betöltve');
        }
        
        // Biztonságos konfiguráció betöltése
        const config = getEmailConfig();
        if (!config) {
            throw new Error('EmailJS konfiguráció nem érhető el');
        }
        
        // EmailJS inicializálása fokozott biztonsággal
        emailjs.init({
            publicKey: config.publicKey,
            // Bot protection
            blockHeadless: true,
            blockList: {
                list: ['test@test.com', 'spam@spam.com', 'fake@fake.com'],
                watchVariable: 'userEmail'
            },
            limitRate: {
                id: 'gazirto_contact_form',
                throttle: 30000, // 30 másodperc throttle
            }
        });
        
        console.log('EmailJS sikeresen inicializálva biztonságos konfigurációval');
        return true;
        
    } catch (error) {
        console.error('EmailJS inicializálási hiba:', error);
        return false;
    }
}

// Email küldése EmailJS-sel
async function sendEmailViaEmailJS(formData) {
    try {
        // Session-alapú rate limiting ellenőrzés
        emailAttempts++;
        if (emailAttempts > MAX_ATTEMPTS_PER_SESSION) {
            throw new Error('Túl sok próbálkozás ebben a session-ben. Kérjük, frissítse az oldalt és próbálja újra.');
        }
        
        // Időalapú rate limiting ellenőrzés
        const now = Date.now();
        if (now - lastEmailSent < EMAIL_COOLDOWN) {
            const remainingTime = Math.ceil((EMAIL_COOLDOWN - (now - lastEmailSent)) / 1000);
            throw new Error(`Túl sok kérés. Kérjük, várjon ${remainingTime} másodpercet.`);
        }
        
        // Ellenőrizzük, hogy az EmailJS inicializálva van-e
        if (typeof emailjs === 'undefined') {
            throw new Error('EmailJS nincs betöltve');
        }
        
        // Biztonságos konfiguráció betöltése
         const config = getEmailConfig();
         if (!config) {
             throw new Error('EmailJS konfiguráció nem érhető el');
         }
        
        // Template paraméterek előkészítése a mapping alapján
        const templateParams = {};
        
        // Automatikus mapping a TEMPLATE_PARAMS alapján
         Object.keys(TEMPLATE_PARAMS).forEach(templateKey => {
             const formKey = TEMPLATE_PARAMS[templateKey];
             if (formKey === 'name' || formKey === 'email' || formKey === 'phone' || formKey === 'service' || formKey === 'message') {
                 // FormData vagy objektum kezelése
                 let value = '';
                 if (formData instanceof FormData) {
                     value = formData.get(formKey) || '';
                 } else if (typeof formData === 'object') {
                     value = formData[formKey] || '';
                 }
                 templateParams[templateKey] = value;
             } else if (formKey === 'subject') {
                 // Dinamikus subject generálása
                 const customerName = formData instanceof FormData ? formData.get('name') || 'Ügyfél' : (formData.name || 'Ügyfél');
                 const serviceType = formData instanceof FormData ? formData.get('service') || 'általános' : (formData.service || 'általános');
                 const serviceNames = {
                     'gyomirtas': 'Gyomirtás',
                     'permetezés': 'Permetezés', 
                     'talajkezeles': 'Talajkezelés',
                     'tanacsadas': 'Tanácsadás',
                     'egyeb': 'Egyéb szolgáltatás'
                 };
                 const serviceName = serviceNames[serviceType] || 'Általános megkeresés';
                 templateParams[templateKey] = `Új ügyféli megkeresés - ${serviceName} (${customerName})`;
             } else if (formKey === 'time') {
                 // Időbélyeg generálása
                 templateParams[templateKey] = new Date().toLocaleString('hu-HU', {
                     year: 'numeric',
                     month: '2-digit', 
                     day: '2-digit',
                     hour: '2-digit',
                     minute: '2-digit'
                 });
             } else {
                 templateParams[templateKey] = formKey; // Statikus értékek (pl. to_name)
             }
         });
        
        // Extra biztonsági ellenőrzések
        if (!templateParams.from_email || !templateParams.from_name || !templateParams.message) {
            throw new Error('Kötelező mezők hiányoznak');
        }
        
        // Email formátum ellenőrzése
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(templateParams.from_email)) {
            throw new Error('Érvénytelen email formátum');
        }
        
        console.log('Email küldése a következő paraméterekkel:', templateParams);

        // Email küldése
         const response = await emailjs.send(
             config.serviceId,
             config.templateId,
             templateParams
         );
        
        // Sikeres küldés esetén frissítjük a rate limiting változót
        lastEmailSent = now;

        console.log('Email sikeresen elküldve:', response);
        return { success: true, response };

    } catch (error) {
        console.error('Email küldési hiba:', error);
        
        // Specifikus hibaüzenetek
        let errorMessage = 'Ismeretlen hiba történt';
        
        if (error.text) {
            // EmailJS specifikus hibák
            if (error.text.includes('Invalid') || error.status === 400) {
                errorMessage = 'Hibás adatok vagy konfiguráció';
            } else if (error.status === 401 || error.text.includes('Unauthorized')) {
                errorMessage = 'Hitelesítési hiba - ellenőrizze az EmailJS beállításokat';
            } else if (error.status === 403) {
                errorMessage = 'Hozzáférés megtagadva';
            } else if (error.status === 429 || error.text.includes('rate')) {
                errorMessage = 'Túl sok kérés - próbálja újra később';
            } else {
                errorMessage = error.text;
            }
        } else if (error.message) {
            errorMessage = error.message;
        }
        
        return { success: false, error: errorMessage };
    }
}

// Exportáljuk a függvényeket globálisan
window.getEmailConfig = getEmailConfig;
window.initializeEmailJS = initializeEmailJS;
window.sendEmailViaEmailJS = sendEmailViaEmailJS;

// Biztonsági figyelmeztetés
console.log('EmailJS biztonságos konfiguráció betöltve. Érzékeny adatok nem tárolódnak a kódban.');