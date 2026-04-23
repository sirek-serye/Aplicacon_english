import express from 'express';
import cors from 'cors';
import { getDb } from './db.js';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Get User Info
app.get('/api/user', async (req, res) => {
  try {
    const db = await getDb();
    const user = await db.get('SELECT * FROM users WHERE id = ?', ['leo']);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Get Next Level
app.get('/api/levels/next', async (req, res) => {
  try {
    const db = await getDb();
    const level = await db.get('SELECT * FROM levels ORDER BY RANDOM() LIMIT 1');
    if (level) {
      level.available_words = JSON.parse(level.available_words);
      level.target_sentence = JSON.parse(level.target_sentence);
    }
    res.json(level);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Complete Level
app.post('/api/levels/complete', async (req, res) => {
  try {
    const db = await getDb();
    const { isCorrect } = req.body;
    if (isCorrect) {
      await db.run('UPDATE users SET gold = gold + 50 WHERE id = ?', ['leo']);
    }
    const user = await db.get('SELECT * FROM users WHERE id = ?', ['leo']);
    res.json({ success: true, newGold: user.gold });
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

app.listen(port, () => {
  console.log(`API Server running on http://localhost:${port}`);
});
