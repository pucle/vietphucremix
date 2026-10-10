import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateStylingAdvice, explainColorAesthetics } from './server/geminiApi.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// API endpoints
app.post('/api/ai-suggest', async (req, res) => {
  try {
    const advice = await generateStylingAdvice(req.body);
    res.json({ success: true, advice });
  } catch (error: unknown) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
});

app.post('/api/color-harmony', async (req, res) => {
  try {
    const explanation = await explainColorAesthetics(req.body);
    res.json({ success: true, explanation });
  } catch (error: unknown) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
});

// Serve static assets in production
app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
