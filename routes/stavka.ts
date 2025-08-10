import { Router } from 'express';
import { konekcija } from '../src/mysqlTabela/tabela';

const stavkaRuter = Router();

stavkaRuter.get('/', async (req, res) => {
  const [rez] = await konekcija.query('SELECT * FROM stavka_porudzbine');
  res.json(rez);
});

stavkaRuter.post('/', async (req, res) => {
  const { porudzbina_id, jelo_id, kolicina } = req.body;
  await konekcija.query(
    'INSERT INTO stavka_porudzbine (porudzbina_id, jelo_id, kolicina) VALUES (?, ?, ?)',
    [porudzbina_id, jelo_id, kolicina]
  );
  res.json({ poruka: 'Stavka dodata' });
});

export default stavkaRuter;
