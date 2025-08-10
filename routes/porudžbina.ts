import { Router } from 'express';
import { konekcija } from '../src/mysqlTabela/tabela';

const porudzbinaRuter = Router();

porudzbinaRuter.get('/', async (req, res) => {
  const [rez] = await konekcija.query('SELECT * FROM porudzbina');
  res.json(rez);
});

porudzbinaRuter.post('/', async (req, res) => {
  const { korisnik_id, datum } = req.body;
  await konekcija.query(
    'INSERT INTO porudzbina (korisnik_id, datum) VALUES (?, ?)',
    [korisnik_id, datum]
  );
  res.json({ poruka: 'Porudzbina dodata' });
});

export default porudzbinaRuter;
