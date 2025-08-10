import express from 'express';
import cors from 'cors';
import { konekcija } from './mysqlTabela/tabela';
import { korisnikRuter} from '../routes/korisnik';
import jeloRuter from '../routes/jelo';
import porudzbinaRuter from '../routes/porudžbina';
import stavkaRuter from '../routes/stavka';
const PORT=3000;
const app = express();
app.use(cors());
app.use(express.json());

app.get('/api', (req, res) => {
  res.send('Ketering backend radi!');
});


app.use('/api/korisnik', korisnikRuter);
app.use('/api/jelo', jeloRuter);
app.use('/api/porudzbina', porudzbinaRuter);
app.use('/api/stavka', stavkaRuter);


(async () => {
  try {
    const [result] = await konekcija.query('SELECT 1');
    console.log('✅ Povezan sa MySQL bazom');
  } catch (err) {
    console.error('❌ Greška pri povezivanju sa bazom:', err);
  }
})();
app.use('/korisnik', korisnikRuter);

app.listen(PORT, () => {
  console.log(`Server radi na http://localhost:${PORT}`);
});