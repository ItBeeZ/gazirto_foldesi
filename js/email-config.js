// API konfiguráció a nyereményjáték számára
const emailConfig = {
    // Az API kulcs, amit a szerver oldalon beállítottunk
    // Ezt a .env fájlban található API_KEY értékkel megegyezően kell beállítani
    apiKey: 'q8r1s4t7u0v3w6x9y2z5A8B1C4D7E0F3G6H9I2J5K8L1M4N7O0P3Q6R9S2T5U8',
    
    // Egyéb konfigurációs beállítások
    // Ezeket a beállításokat a szerver oldali konfigurációval összhangban kell beállítani
    // A teljes API URL a backend szerverhez
    // Fejlesztési környezetben: http://localhost:5000/api
    // Éles környezetben: https://gazirto.hu/api
    baseUrl: 'https://80.211.195.172:5000/api',
    endpoints: {
        giveaway: '/giveaway',
        verify: '/verify',
        email: '/email' // Hozzáadva: email mentési végpont
    }
};

// Exportáljuk a konfigurációt, hogy más fájlok is használhassák
if (typeof module !== 'undefined' && module.exports) {
    module.exports = emailConfig;
} else {
    // Böngészőben futtatva globális változóként tesszük elérhetővé
    window.emailConfig = emailConfig;
}

console.log('API konfiguráció betöltve a nyereményjáték számára');