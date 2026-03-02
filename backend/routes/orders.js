const express = require('express');
const router  = express.Router();
const { db }  = require('../db/init');

router.post('/', async (req, res) => {
  const { product_name, product_price, product_img, customer_name, customer_phone, customer_city, customer_note, payment_phone } = req.body;
  if (!product_name || !product_price || !customer_name || !customer_phone || !customer_city || !payment_phone)
    return res.status(400).json({ error: 'Champs obligatoires manquants.' });
  try {
    const result = await db.asyncRun(
      `INSERT INTO orders (product_name, product_price, product_img, customer_name, customer_phone, customer_city, customer_note, payment_phone)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [product_name, parseInt(product_price), product_img || '', customer_name, customer_phone, customer_city, customer_note || '', payment_phone]
    );
    const order = await db.asyncGet('SELECT * FROM orders WHERE id = ?', [result.lastID]);
    res.status(201).json({ message: 'Commande enregistrée !', order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  const orders = await db.asyncAll('SELECT * FROM orders ORDER BY created_at DESC');
  res.json({ orders });
});

router.patch('/:id/status', async (req, res) => {
  const { status } = req.body;
  const allowed = ['pending', 'confirmed', 'delivered', 'cancelled'];
  if (!allowed.includes(status)) return res.status(400).json({ error: 'Statut invalide.' });
  await db.asyncRun('UPDATE orders SET status = ? WHERE id = ?', [status, req.params.id]);
  res.json({ message: `Statut mis à jour : ${status}` });
});

module.exports = router;
