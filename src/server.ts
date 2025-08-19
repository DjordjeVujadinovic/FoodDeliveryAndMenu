import express from 'express';
import cors from 'cors';
import { konekcija } from './mysqlTabela/tabela';
import bodyParser from "body-parser";
import korisnikRuter from '../src/routes/korisnik.routes';
import jeloRuter from './routes/jelo.routes';
import porudzbinaRuter from './routes/porudzbina.routes';
import stavkaRuter from './routes/stavka.routes';
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.json());
app.get('/api', (req, res) => {
  res.send('Ketering backend radi!');
});
app.use('/api/korisnik', korisnikRuter);
app.use('/api/jelo', jeloRuter);
app.use('/api/porudzbina', porudzbinaRuter);
app.use('/api/stavka', stavkaRuter);
app.get("/", (req, res) => {
  res.send("Food Delivery API radi ");
});
(async () => {
  try {
    await konekcija.query('SELECT 1');
    console.log('Povezan sa MySQL bazom');
  } catch (err) {
    console.error('Greška pri povezivanju sa bazom:', err);
  }
})();

app.listen(PORT, () => {
  console.log(`Server radi na http://localhost:${PORT}`);
});
