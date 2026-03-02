const express = require('express');
const router  = express.Router();
const { db }  = require('../db/init');

router.get('/stats', async (req, res) => {
  const totalOrders    = await db.asyncGet('SELECT COUNT(*) as c FROM orders');
  const pendingOrders  = await db.asyncGet("SELECT COUNT(*) as c FROM orders WHERE status = 'pending'");
  const totalMessages  = await db.asyncGet('SELECT COUNT(*) as c FROM messages');
  const unreadMessages = await db.asyncGet('SELECT COUNT(*) as c FROM messages WHERE read = 0');
  const revenue        = await db.asyncGet("SELECT SUM(product_price) as s FROM orders WHERE status != 'cancelled'");
  const recentOrders   = await db.asyncAll('SELECT * FROM orders ORDER BY created_at DESC LIMIT 5');
  res.json({
    stats: {
      totalOrders:    totalOrders.c,
      pendingOrders:  pendingOrders.c,
      totalMessages:  totalMessages.c,
      unreadMessages: unreadMessages.c,
      revenue:        revenue.s || 0
    },
    recentOrders
  });
});

router.get('/orders', async (req, res) => {
  const orders = await db.asyncAll('SELECT * FROM orders ORDER BY created_at DESC');
  res.json({ orders });
});

router.get('/messages', async (req, res) => {
  const msgs = await db.asyncAll('SELECT * FROM messages ORDER BY created_at DESC');
  res.json({ messages: msgs });
});

module.exports = router;
