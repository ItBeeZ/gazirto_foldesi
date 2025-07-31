const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');

// Környezeti változók betöltése
dotenv.config();

// Express alkalmazás inicializálása
const app = express();

// Middleware-ek beállítása
app.use(express.json());
app.use(cors({
  origin: ['https://www.gazirto.hu', 'https://gazirto.hu', 'http://www.gazirto.hu', 'http://gazirto.hu']
}));
app.use(helmet());

// MongoDB kapcsolat létrehozása
mongoose.connect(process.env.MONGODB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB kapcsolat létrejött'))
.catch(err => {
  console.error('MongoDB kapcsolódási hiba:', err.message);
  process.exit(1);
});

// Modellek importálása
require('./models/Registration');

// Alap útvonal
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Gazirtó Földesi Nyereményjáték API'
  });
});

// API útvonalak
app.use('/api/registrations', require('./routes/registrations'));

// Port beállítása
const PORT = process.env.PORT || 5000;

// Szerver indítása
app.listen(PORT, () => {
  console.log(`Szerver fut a következő porton: ${PORT}`);
});