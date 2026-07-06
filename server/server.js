import express from 'express';
import cors from 'cors';
import db from './db.js';

const PORT = 3001;
const app = express();
app.use(cors());
app.use(express.json());

// GET readings, newest first
app.get('/readings', (req, res) => {
  const rows = db.prepare('SELECT * FROM readings ORDER BY timestamp DESC').all();
  res.json(rows);
});

// POST new readings
app.post('/readings', (req, res) => {
  const { systolic, diastolic, timestamp } = req.body;
  const info = db.prepare(
    'INSERT INTO readings (systolic, diastolic, timestamp) VALUES (?, ?, ?)'
  ).run(systolic, diastolic, timestamp);
  res.json({ id: info.lastInsertRowid, systolic, diastolic, timestamp });
});

// PUT (update) reading
app.put('/readings/:id', (req, res) => {
  const { systolic, diastolic, timestamp } = req.body;
  db.prepare(
    'UPDATE readings SET systolic = ?, diastolic = ?, timestamp = ? WHERE id = ?'
  ).run(systolic, diastolic, timestamp, req.params.id);
  res.json({ ok: true });
});

// DELETE reading
app.delete('/readings/:id', (req, res) => {
  db.prepare('DELETE FROM readings WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

app.listen(3001, () => console.log(`API running on port ${PORT}`)); 
