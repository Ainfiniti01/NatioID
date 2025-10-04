import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const dbPath = path.join(process.cwd(), '..', '..', 'api-server', 'db.json');
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      console.error("Error reading db.json:", err);
      res.status(500).json({ error: 'Failed to load data' });
      return;
    }
    try {
      const jsonData = JSON.parse(data);
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(jsonData);
    } catch (parseError) {
      console.error("Error parsing db.json:", parseError);
      res.status(500).json({ error: 'Failed to parse data' });
    }
  });
}
