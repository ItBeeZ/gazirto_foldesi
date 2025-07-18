# HTML Email Template Beállítási Útmutató

## Probléma
Jelenleg az EmailJS template egyszerű szöveges formátumban van beállítva, ezért a kapott emailek nem HTML formátumúak.

## Megoldás: HTML Template Beállítása

### 1. EmailJS Dashboard Megnyitása
1. Lépjen be az [EmailJS Dashboard](https://dashboard.emailjs.com/)-ba
2. Navigáljon az "Email Templates" menüpontra
3. Keresse meg a jelenlegi template-et vagy hozzon létre újat

### 2. Template Beállítások

**Subject (Tárgy):**
```
{{subject}}
```

**Content (Tartalom) - HTML FORMÁTUM:**
```html
<div style="font-family: 'Inter', system-ui, sans-serif, Arial; font-size: 14px; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; background-color: #f8f9fa;">
  <!-- Header -->
  <div style="background: linear-gradient(135deg, #2c5530 0%, #4a7c59 100%); padding: 30px 20px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 600;">📧 Új üzenet érkezett</h1>
    <p style="color: #e8f5e8; margin: 10px 0 0 0; font-size: 16px;">Gazirtó Földesi - Kapcsolatfelvétel</p>
  </div>

  <!-- Content -->
  <div style="background-color: white; padding: 30px 20px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    
    <!-- Message Info -->
    <div style="background-color: #f1f8f4; padding: 20px; border-radius: 8px; border-left: 4px solid #4a7c59; margin-bottom: 25px;">
      <p style="margin: 0; font-size: 16px; color: #2c5530;">
        <strong>{{from_name}}</strong> üzenetet küldött a weboldalon keresztül.
      </p>
      <p style="margin: 8px 0 0 0; font-size: 14px; color: #666;">
        📅 Időpont: {{time}} | 📧 Email: {{from_email}}
      </p>
    </div>

    <!-- User Details Table -->
    <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
      <tr>
        <td style="vertical-align: top; padding-right: 15px;">
          <div style="
            padding: 12px;
            background: linear-gradient(135deg, #4a7c59 0%, #2c5530 100%);
            border-radius: 50%;
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
          ">
            👤
          </div>
        </td>
        <td style="vertical-align: top;">
          <div style="color: #2c5530; font-size: 18px; font-weight: 600; margin-bottom: 5px;">
            {{from_name}}
          </div>
          <div style="color: #666; font-size: 14px; margin-bottom: 8px;">
            📧 {{from_email}}
          </div>
          <div style="color: #666; font-size: 14px; margin-bottom: 8px;">
            📞 {{phone}}
          </div>
          <div style="color: #4a7c59; font-size: 14px; font-weight: 500;">
            🛠️ Szolgáltatás: {{service}}
          </div>
        </td>
      </tr>
    </table>

    <!-- Message Content -->
    <div style="
      background-color: #fafbfc;
      border: 1px solid #e1e8ed;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 25px;
    ">
      <h3 style="color: #2c5530; margin: 0 0 15px 0; font-size: 16px; font-weight: 600;">
        💬 Üzenet tartalma:
      </h3>
      <div style="
        color: #333;
        font-size: 15px;
        line-height: 1.6;
        white-space: pre-wrap;
        word-wrap: break-word;
      ">
        {{message}}
      </div>
    </div>

    <!-- Action Buttons -->
    <div style="text-align: center; margin-bottom: 20px;">
      <a href="mailto:{{from_email}}?subject=Re: Gazirtó Földesi - Válasz az érdeklődésére"
         style="
           display: inline-block;
           background: linear-gradient(135deg, #4a7c59 0%, #2c5530 100%);
           color: white;
           text-decoration: none;
           padding: 12px 25px;
           border-radius: 6px;
           font-weight: 600;
           font-size: 14px;
           margin-right: 10px;
         ">
        📧 Válasz küldése
      </a>
      <a href="tel:{{phone}}"
         style="
           display: inline-block;
           background-color: #f8f9fa;
           color: #4a7c59;
           text-decoration: none;
           padding: 12px 25px;
           border: 2px solid #4a7c59;
           border-radius: 6px;
           font-weight: 600;
           font-size: 14px;
         ">
        📞 Hívás
      </a>
    </div>

    <!-- Footer Info -->
    <div style="
      border-top: 1px solid #e1e8ed;
      padding-top: 20px;
      text-align: center;
      color: #666;
      font-size: 13px;
    ">
      <p style="margin: 0 0 10px 0;">
        <strong>Gazirtó Földesi</strong> - Professzionális kertészeti szolgáltatások
      </p>
      <p style="margin: 0 0 10px 0;">
        📍 Békéscsaba, Pásztor u., 5600 | 📞 06-30/460-3898
      </p>
      <p style="margin: 0;">
        🌐 <a href="mailto:gazirtokertesz@gmail.com" style="color: #4a7c59; text-decoration: none;">gazirtokertesz@gmail.com</a>
      </p>
    </div>
  </div>
</div>
```

### 3. További Template Paraméterek

A fenti HTML template a következő változókat használja:
- `{{subject}}` - Dinamikus tárgy
- `{{from_name}}` - Feladó neve
- `{{from_email}}` - Feladó email címe
- `{{phone}}` - Telefonszám
- `{{service}}` - Szolgáltatás típusa
- `{{message}}` - Üzenet tartalma
- `{{time}}` - Időbélyeg (opcionális)

### 4. Template Beállítások az EmailJS-ben

**To Email:**
```
gazirtokertesz@gmail.com
```

**From Name:**
```
{{from_name}}
```

**Reply To:**
```
{{from_email}}
```

### 5. Időbélyeg Hozzáadása (Opcionális)

Ha szeretné, hogy az email tartalmazza az időbélyeget, frissítse az `email-config.js` fájlt:

```javascript
// A TEMPLATE_PARAMS objektumhoz adja hozzá:
time: new Date().toLocaleString('hu-HU', {
  year: 'numeric',
  month: '2-digit', 
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit'
})
```

### 6. Tesztelés

1. Mentse el a template módosításokat az EmailJS Dashboard-ban
2. Győződjön meg róla, hogy a template "Published" állapotban van
3. Tesztelje az űrlapot a weboldalon
4. Ellenőrizze, hogy a kapott email HTML formátumú-e

### 7. Hibaelhárítás

**Ha továbbra is szöveges emailt kap:**
1. Ellenőrizze, hogy a template HTML módban van-e beállítva
2. Győződjön meg róla, hogy a template publikálva van
3. Várjon néhány percet a változások érvényesülésére
4. Próbálja meg újra küldeni az emailt

**Ha a template változók nem jelennek meg:**
1. Ellenőrizze a változók neveit ({{from_name}}, {{from_email}}, stb.)
2. Győződjön meg róla, hogy a JavaScript kód megfelelően küldi a paramétereket
3. Nézze meg a böngésző konzolt hibaüzenetekért

---

**Megjegyzés:** Ez az útmutató megoldja azt a problémát, hogy az EmailJS egyszerű szöveges emaileket küld HTML formátum helyett.