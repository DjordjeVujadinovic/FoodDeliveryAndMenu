import { Router } from 'express';
import { konekcija } from '../src/mysqlTabela/tabela';

const stavkaRuter = Router();

stavkaRuter.get('/artikal', async (req, res) => {
  try {
    const [stavke] = await konekcija.query('SELECT * FROM stavkeporudzbine');
    res.json(stavke);
  } catch (err) {
    res.status(500).json({ error: 'Greška pri dohvaćanju stavki porudžbine.' });
  }
});

export default stavkaRuter;
