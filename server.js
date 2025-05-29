import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve frontend from 'public'

const storage = {}; // In-memory key-value store

app.get('/storage/:key', (req, res) => {
  const key = req.params.key;
  if (storage[key]) {
    res.json({ value: storage[key] });
  } else {
    res.status(404).json({ error: 'Key not found' });
  }
});

app.post('/storage', (req, res) => {
  const { key, value } = req.body;
  if (!key || !Array.isArray(value)) {
    return res.status(400).json({ error: 'Invalid payload' });
  }

  storage[key] = value;
  res.status(200).json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
     
    


