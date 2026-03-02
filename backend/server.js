require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const path    = require('path');
const { initDB } = require('./db/init');

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Servir les fichiers statiques (HTML, CSS, JS, images) ──
app.use(express.static(path.join(__dirname, '..')));

// ── Routes API ──
app.use('/api/auth',     require('./routes/auth'));
app.use('/api/orders',   require('./routes/orders'));
app.use('/api/messages', require('./routes/messages'));
app.use('/api/admin',    require('./routes/admin'));

// ── Route principale → index.html ──
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// ── Route admin ──
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '../admin.html'));
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: '🚀 Art by Joe Backend opérationnel' });
});

app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.url} introuvable` });
});
app.use((err, req, res, next) => {
  console.error('Erreur :', err.message);
  res.status(500).json({ error: 'Erreur interne du serveur' });
});

initDB();
app.listen(PORT, () => {
  console.log(`\n✿ Art by Joe Backend`);
  console.log(`🚀 Serveur  : http://localhost:${PORT}`);
  console.log(`🌐 Site     : http://localhost:${PORT}`);
  console.log(`🔐 Admin    : http://localhost:${PORT}/admin`);
  console.log(`💚 Health   : http://localhost:${PORT}/api/health\n`);
});