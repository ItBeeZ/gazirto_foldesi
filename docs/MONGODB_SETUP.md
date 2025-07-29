# MongoDB Regisztrációs Rendszer Telepítési Útmutató

## Áttekintés

Ez az útmutató segít beállítani a MongoDB adatbázist a nyereményjáték regisztrációk tárolásához. A rendszer a következő komponensekből áll:

1. **MongoDB adatbázis** - A regisztrációs adatok tárolására
2. **Node.js szerver** - Az API végpontok kezelésére
3. **Frontend integráció** - A regisztrációs űrlap adatainak elküldésére

## Előfeltételek

- Node.js (v14 vagy újabb)
- npm (v6 vagy újabb)
- MongoDB (v4 vagy újabb) vagy MongoDB Atlas fiók

## Telepítési lépések

### 1. MongoDB telepítése

#### Lokális telepítés

1. Töltsd le és telepítsd a MongoDB Community Edition-t a [hivatalos oldalról](https://www.mongodb.com/try/download/community)
2. Indítsd el a MongoDB szolgáltatást
3. Hozz létre egy új adatbázist `gazirto` néven

#### MongoDB Atlas (felhő alapú)

1. Regisztrálj egy [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) fiókot
2. Hozz létre egy új klasztert
3. Állítsd be a hálózati hozzáférést (IP whitelist)
4. Hozz létre egy adatbázis felhasználót
5. Szerezd be a kapcsolódási URI-t

### 2. Backend szerver telepítése

1. Navigálj a `server` mappába
2. Futtasd az `npm install` parancsot a függőségek telepítéséhez
3. Hozd létre vagy módosítsd a `.env` fájlt a következő tartalommal:

```
# Felhő alapú MongoDB kapcsolat:
MONGODB_URI=mongodb+srv://probaemail2023:3fOtsd4hfMz8Uy6h@cluster0.olldruk.mongodb.net/notes
PORT=3001
```

4. Indítsd el a szervert fejlesztői módban:

```
npm run dev
```

### 3. Frontend integráció

A frontend már integrálva van a nyereményjáték oldalba. A `nyeremenyjatek.min.js` fájl már tartalmazza a szükséges kódot a regisztrációs adatok elküldéséhez.

### 4. Domain beállítások

- A backend szerver az **api.gazirto.hu** domain-en fut
- A frontend a **gazirto.hu** domain-en fut
- A nyereményjáték oldal a **gazirto.hu/nyeremenyjatek.html** címen érhető el
- A CORS beállítások már konfigurálva vannak, hogy a gazirto.hu domain-ről érkező kéréseket elfogadja

## Tesztelés

1. Indítsd el a backend szervert
2. Nyisd meg a nyereményjáték oldalt a böngészőben
3. Tölts ki egy regisztrációs űrlapot érvényes email címmel és Facebook URL-lel
4. Ellenőrizd, hogy a regisztráció sikeresen megtörtént-e
5. Ellenőrizd a MongoDB adatbázisban, hogy az adatok megfelelően tárolódtak-e

## Hibaelhárítás

### A szerver nem indul el

- Ellenőrizd, hogy a MongoDB fut-e
- Ellenőrizd a `.env` fájl beállításait
- Ellenőrizd a konzol hibaüzeneteit

### A regisztráció nem működik

- Ellenőrizd a böngésző konzolját hibaüzenetekért
- Ellenőrizd, hogy a szerver fut-e és elérhető-e

## Biztonsági megfontolások

- Állíts be megfelelő hálózati korlátozásokat a MongoDB-hez
- A rendszer már HTTPS-t használ a production környezetben
- Rendszeresen készíts biztonsági mentést az adatbázisról
- A MongoDB Atlas fiók hozzáférési adatait bizalmasan kezeld