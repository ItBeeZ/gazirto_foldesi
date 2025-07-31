const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');

// Új regisztráció létrehozása
router.post('/', async (req, res) => {
  try {
    const { email, facebookUrl } = req.body;

    // Ellenőrizzük, hogy az email vagy a Facebook URL már létezik-e
    const existingEmailRegistration = await Registration.findOne({ email });
    if (existingEmailRegistration) {
      return res.status(400).json({
        success: false,
        message: 'Ez az email cím már regisztrálva van a nyereményjátékra'
      });
    }

    const existingFacebookRegistration = await Registration.findOne({ facebookUrl });
    if (existingFacebookRegistration) {
      return res.status(400).json({
        success: false,
        message: 'Ez a Facebook profil már regisztrálva van a nyereményjátékra'
      });
    }

    // Új regisztráció létrehozása
    const registration = new Registration({
      email,
      facebookUrl
    });

    await registration.save();

    res.status(201).json({
      success: true,
      message: 'Sikeres regisztráció a nyereményjátékra!',
      data: {
        email: registration.email,
        facebookUrl: registration.facebookUrl,
        registrationDate: registration.registrationDate
      }
    });
  } catch (error) {
    // Validációs hibák kezelése
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }

    // Egyéb hibák kezelése
    console.error('Regisztrációs hiba:', error);
    res.status(500).json({
      success: false,
      message: 'Szerver hiba történt a regisztráció során'
    });
  }
});



module.exports = router;