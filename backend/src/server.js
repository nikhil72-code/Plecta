import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { waitlistRouter } from './routes/waitlist.js';

const app = express();
app.set('trust proxy', 1);

const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';

app.use(cors({ origin: FRONTEND_ORIGIN }));
app.use(express.json({ limit: '20kb' }));

app.get('/api/health', (req, res) => res.json({ ok: true }));
app.use('/api', waitlistRouter);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Plecta backend listening on :${port}`);
});
