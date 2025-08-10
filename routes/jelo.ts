import { Router } from 'express';
import { konekcija } from '../src/mysqlTabela/tabela';

const jeloRuter = Router();

jeloRuter.get('/', async (req, res) => {
  const [rez] = await konekcija.query('SELECT * FROM jelo');
  res.json(rez);
});

jeloRuter.post('/', async (req, res) => {
  const { naziv, opis, cena } = req.body;
  await konekcija.query(
    'INSERT INTO jelo (naziv, opis, cena) VALUES (?, ?, ?)',
    [naziv, opis, cena]
  );
  res.json({ poruka: 'Jelo dodato' });
});
export default jeloRuter;
