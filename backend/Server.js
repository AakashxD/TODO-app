const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const i18next = require('i18next');
const i18nextMiddleware = require('i18next-express-middleware');
const i18nextFSBackend = require('i18next-node-fs-backend');

// Initialize Express app
const app = express();

// Middleware
app.use(bodyParser.json());

// Initialize i18next for multi-language support
i18next
  .use(i18nextFSBackend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    backend: {
      loadPath: './locales/{{lng}}/translation.json',
    },
  });

// Use i18next middleware
app.use(i18nextMiddleware.handle(i18next));

// Basic route
app.get('/', (req, res) => {
  res.send(req.t('welcome'));
});
app.post('/api/book', (req, res) => {
    const { name, date, tickets, language } = req.body;
    
    // Example booking processing (in a real application, you'd save this to a database)
    const booking = {
      name,
      date,
      tickets,
      language,
      confirmationNumber: Math.floor(Math.random() * 1000000)
    };
    
    res.json({
      message: req.t('booking_success'),
      booking
    });
  });

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/').then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
