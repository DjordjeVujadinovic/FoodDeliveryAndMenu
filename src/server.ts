import express from 'express';
import cors from 'cors';
import { konekcija } from './mysqlTabela/tabela';
import korisnikRuter from './routes/korisnik.routes';
import jeloRuter from './routes/jelo.routes';
import porudzbinaRuter from './routes/porudzbina.routes';
import stavkaRuter from './routes/stavka.routes';
import adminRuter from './routes/admin.routes';
import authRuter from './routes/autentifikacija.routes';
import path from 'path';
import { fileURLToPath } from 'url';
const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(cors());
app.use(express.json({ type: 'application/json' }));
app.use('/api/korisnik', korisnikRuter);
app.use('/api/jela', jeloRuter);
app.use('/api/porudzbina', porudzbinaRuter);
app.use('/api/stavka', stavkaRuter);
app.use('/api/admin', adminRuter);
app.use('/api', authRuter); 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.get("/", (req, res) => {
  res.send("API radi ");
});
(async () => {
  try {
    await konekcija.query('SELECT 1');
    console.log('Povezan sa bazom');
  } catch (err) {
    console.error('Greška pri povezivanju sa bazom:', err);
  }
})();
app.listen(PORT, () => {
  console.log(`Server radi http://localhost:${PORT}`);
});
