const express = require('express');
const router  = express.Router();
const { db }  = require('../db/init');

router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message)
    return res.status(400).json({ error: 'Nom, email et message sont requis.' });
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return res.status(400).json({ error: 'Email invalide.' });
  await db.asyncRun('INSERT INTO messages (name, email, subject, message) VALUES (?, ?, ?, ?)',
    [name, email, subject || '', message]);
  res.status(201).json({ message: 'Message reçu, merci !' });
});

router.get('/', async (req, res) => {
  const msgs = await db.asyncAll('SELECT * FROM messages ORDER BY created_at DESC');
  res.json({ messages: msgs });
});

router.patch('/:id/read', async (req, res) => {
  await db.asyncRun('UPDATE messages SET read = 1 WHERE id = ?', [req.params.id]);
  res.json({ message: 'Marqué comme lu' });
});

module.exports = router;
