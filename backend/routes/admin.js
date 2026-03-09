const express  = require('express');
const router   = express.Router();
const { db }   = require('../db/init');
const multer   = require('multer');
const path     = require('path');
const fs       = require('fs');

const UPLOAD_DIR = path.join(__dirname, '../uploads');
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const ext  = path.extname(file.originalname).toLowerCase();
    const name = Date.now() + '-' + Math.round(Math.random() * 1e6) + ext;
    cb(null, name);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ok = /image\/(jpeg|png|webp|gif)/.test(file.mimetype);
    cb(ok ? null : new Error('Format invalide'), ok);
  }
});

router.get('/stats', async (req, res) => {
  try {
    const totalOrders    = await db.asyncGet('SELECT COUNT(*) as c FROM orders');
    const pendingOrders  = await db.asyncGet("SELECT COUNT(*) as c FROM orders WHERE status = 'pending'");
    const totalMessages  = await db.asyncGet('SELECT COUNT(*) as c FROM messages');
    const unreadMessages = await db.asyncGet('SELECT COUNT(*) as c FROM messages WHERE read = 0');
    const revenue        = await db.asyncGet("SELECT SUM(product_price) as s FROM orders WHERE status != 'cancelled'");
    const recentOrders   = await db.asyncAll('SELECT * FROM orders ORDER BY created_at DESC LIMIT 5');
    res.json({ stats: { totalOrders: totalOrders.c, pendingOrders: pendingOrders.c, totalMessages: totalMessages.c, unreadMessages: unreadMessages.c, revenue: revenue.s || 0 }, recentOrders });
  } catch(e) { res.status(500).json({ error: e.message }); }
});

router.get('/orders', async (req, res) => {
  try { const orders = await db.asyncAll('SELECT * FROM orders ORDER BY created_at DESC'); res.json({ orders }); }
  catch(e) { res.status(500).json({ error: e.message }); }
});

router.get('/messages', async (req, res) => {
  try { const msgs = await db.asyncAll('SELECT * FROM messages ORDER BY created_at DESC'); res.json({ messages: msgs }); }
  catch(e) { res.status(500).json({ error: e.message }); }
});

const DEFAULT_PRODUCTS = [
  { name:'Sandales Papillon',    price:8000,  category:'sandales', badge:'Nouveau',   description:'Motif papillon multicolore, semelle naturelle confortable.',           image_url:'images/sd6.jpg' },
  { name:'Sac Damier',           price:12000, category:'sac',      badge:'Populaire', description:'Sac macrame tisse main a motifs damier.',                              image_url:'images/sc.jpg'  },
  { name:'Sac Arc-en-Ciel',      price:15000, category:'sac',      badge:'',          description:'Sac raye multicolore avec noeud satin decoratif.',                    image_url:'images/sc0.jpg' },
  { name:'Portrait Pixel',       price:20000, category:'pixel',    badge:'Exclusif',  description:'Tableau pixel haute resolution, portrait personnalise.',               image_url:'images/mp.jpg'  },
  { name:'Pixel Art Nouveau',    price:20000, category:'pixel',    badge:'Nouveau',   description:'Creation originale tissee a la main.',                                 image_url:'images/nv.jpg'  },
  { name:'Pixel Art Nouveau 2',  price:20000, category:'pixel',    badge:'Nouveau',   description:'Motif exclusif tisse avec soin a Porto-Novo.',                         image_url:'images/nv1.jpg' },
  { name:'Sandales Azteques',    price:10000, category:'sandales', badge:'',          description:'Design geometrique azteque multicolore.',                               image_url:'images/sd1.jpg' },
  { name:'Sandales Fleurs',      price:9000,  category:'sandales', badge:'',          description:'Motifs floraux delicats tisses main.',                                  image_url:'images/sd0.jpg' },
  { name:'Bracelet Bresilien',   price:2500,  category:'bracelet', badge:'Nouveau',   description:'Bracelet tresse multicolore fait main.',                               image_url:'images/sdb.jpg' },
  { name:'Bracelet Paracorde',   price:3000,  category:'bracelet', badge:'',          description:'Bracelet de survie en paracorde.',                                     image_url:'images/sdc.jpg' },
  { name:'Bracelet Alpha',       price:3500,  category:'bracelet', badge:'Exclusif',  description:'Bracelet alpha aux motifs geometriques.',                               image_url:'images/sdd.jpg' },
  { name:'Collier Thailandais',  price:5000,  category:'collier',  badge:'Nouveau',   description:'Collier aux noeuds thailandais traditionnels.',                        image_url:'images/ct.jpg'  },
];

(async () => {
  try {
    const count = await db.asyncGet('SELECT COUNT(*) as c FROM products');
    if (count.c === 0) {
      for (const p of DEFAULT_PRODUCTS) {
        await db.asyncRun('INSERT INTO products (name, price, category, badge, description, image_url) VALUES (?, ?, ?, ?, ?, ?)', [p.name, p.price, p.category, p.badge, p.description, p.image_url]);
      }
      console.log('Produits par defaut inseres');
    }
  } catch(e) { console.error('Seed error:', e.message); }
})();

router.get('/products', async (req, res) => {
  try { const products = await db.asyncAll('SELECT * FROM products ORDER BY created_at DESC'); res.json({ products }); }
  catch(e) { res.status(500).json({ error: e.message }); }
});

router.post('/products', upload.single('image'), async (req, res) => {
  try {
    const { name, price, category, badge, description } = req.body;
    if (!name || !price) return res.status(400).json({ error: 'Nom et prix obligatoires' });
    const image_url = req.file ? '/uploads/' + req.file.filename : (req.body.image_url || '');
    const result = await db.asyncRun('INSERT INTO products (name, price, category, badge, description, image_url) VALUES (?, ?, ?, ?, ?, ?)', [name, parseInt(price), category || 'sandales', badge || '', description || '', image_url]);
    const product = await db.asyncGet('SELECT * FROM products WHERE id = ?', [result.lastID]);
    res.status(201).json({ product });
  } catch(e) { res.status(500).json({ error: e.message }); }
});

router.put('/products/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, price, category, badge, description } = req.body;
    if (!name || !price) return res.status(400).json({ error: 'Nom et prix obligatoires' });
    let image_url = req.body.image_url || '';
    if (req.file) image_url = '/uploads/' + req.file.filename;
    if (!req.file && !req.body.image_url) {
      const existing = await db.asyncGet('SELECT image_url FROM products WHERE id = ?', [req.params.id]);
      image_url = existing ? existing.image_url : '';
    }
    await db.asyncRun('UPDATE products SET name=?, price=?, category=?, badge=?, description=?, image_url=? WHERE id=?', [name, parseInt(price), category || 'sandales', badge || '', description || '', image_url, req.params.id]);
    const product = await db.asyncGet('SELECT * FROM products WHERE id = ?', [req.params.id]);
    res.json({ product });
  } catch(e) { res.status(500).json({ error: e.message }); }
});

router.delete('/products/:id', async (req, res) => {
  try { await db.asyncRun('DELETE FROM products WHERE id = ?', [req.params.id]); res.json({ success: true }); }
  catch(e) { res.status(500).json({ error: e.message }); }
});

router.get('/gallery', async (req, res) => {
  try { const images = await db.asyncAll('SELECT * FROM gallery ORDER BY created_at DESC'); res.json({ images }); }
  catch(e) { res.status(500).json({ error: e.message }); }
});

router.post('/gallery', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'Image requise' });
    const { name, category } = req.body;
    const url = '/uploads/' + req.file.filename;
    const result = await db.asyncRun('INSERT INTO gallery (name, url, category) VALUES (?, ?, ?)', [name || req.file.originalname, url, category || 'autres']);
    const image = await db.asyncGet('SELECT * FROM gallery WHERE id = ?', [result.lastID]);
    res.status(201).json({ image });
  } catch(e) { res.status(500).json({ error: e.message }); }
});

router.delete('/gallery/:id', async (req, res) => {
  try {
    const img = await db.asyncGet('SELECT url FROM gallery WHERE id = ?', [req.params.id]);
    if (img && img.url.startsWith('/uploads/')) {
      const filePath = path.join(__dirname, '..', img.url);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
    await db.asyncRun('DELETE FROM gallery WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch(e) { res.status(500).json({ error: e.message }); }
});

router.get('/formations', async (req, res) => {
  try { const formations = await db.asyncAll('SELECT * FROM formations ORDER BY created_at DESC'); res.json({ formations }); }
  catch(e) { res.status(500).json({ error: e.message }); }
});

router.post('/formations', upload.single('image'), async (req, res) => {
  try {
    const { title, price, description } = req.body;
    if (!title || !price) return res.status(400).json({ error: 'Titre et prix obligatoires' });
    const image_url = req.file ? '/uploads/' + req.file.filename : (req.body.image_url || '');
    const result = await db.asyncRun('INSERT INTO formations (title, price, description, image_url) VALUES (?, ?, ?, ?)', [title, parseInt(price), description || '', image_url]);
    const formation = await db.asyncGet('SELECT * FROM formations WHERE id = ?', [result.lastID]);
    res.status(201).json({ formation });
  } catch(e) { res.status(500).json({ error: e.message }); }
});

router.put('/formations/:id', upload.single('image'), async (req, res) => {
  try {
    const { title, price, description } = req.body;
    if (!title || !price) return res.status(400).json({ error: 'Titre et prix obligatoires' });
    let image_url = req.body.image_url || '';
    if (req.file) image_url = '/uploads/' + req.file.filename;
    if (!req.file && !req.body.image_url) {
      const existing = await db.asyncGet('SELECT image_url FROM formations WHERE id = ?', [req.params.id]);
      image_url = existing ? existing.image_url : '';
    }
    await db.asyncRun('UPDATE formations SET title=?, price=?, description=?, image_url=? WHERE id=?', [title, parseInt(price), description || '', image_url, req.params.id]);
    const formation = await db.asyncGet('SELECT * FROM formations WHERE id = ?', [req.params.id]);
    res.json({ formation });
  } catch(e) { res.status(500).json({ error: e.message }); }
});

router.delete('/formations/:id', async (req, res) => {
  try { await db.asyncRun('DELETE FROM formations WHERE id = ?', [req.params.id]); res.json({ success: true }); }
  catch(e) { res.status(500).json({ error: e.message }); }
});

module.exports = router;
