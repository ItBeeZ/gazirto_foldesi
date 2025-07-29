// API konfiguráció a nyereményjáték számára
const emailConfig = {
    
    // Egyéb konfigurációs beállítások
    // Ezeket a beállításokat a szerver oldali konfigurációval összhangban kell beállítani
    // A teljes API URL a backend szerverhez
    // Fejlesztési környezetben: http://localhost:3001/api
    // Éles környezetben: https://api.gazirto.hu/api
    baseUrl: 'https://api.gazirto.hu/api',
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