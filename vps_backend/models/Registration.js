const mongoose = require("mongoose");

// Regisztrációs séma létrehozása
const registrationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email cím megadása kötelező"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Kérjük, adjon meg egy érvényes email címet",
    ],
  },
  facebookUrl: {
    type: String,
    required: [true, "Facebook profil URL megadása kötelező"],
    unique: true,
    trim: true,
    match: [
      /^https:\/\/(www\.)?facebook\.com\/.+$/,
      "Kérjük, adjon meg egy érvényes Facebook profil URL-t",
    ],
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
});

// Egyedi indexek létrehozása
registrationSchema.index({ email: 1 }, { unique: true });
registrationSchema.index({ facebookUrl: 1 }, { unique: true });

module.exports = mongoose.model("Registration", registrationSchema);
