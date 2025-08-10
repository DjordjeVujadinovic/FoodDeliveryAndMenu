import { Router } from 'express';
import { konekcija } from '../src/mysqlTabela/tabela';

export const korisnikRuter = Router();

// GET /korisnici - svi korisnici
korisnikRuter.get('/', async (req, res) => {
  const [rez] = await konekcija.query('SELECT * FROM korisnik');
  res.json(rez);
});

// POST novi korisnik
korisnikRuter.post('/', async (req, res) => {
  const { ime, email, lozinka, uloga } = req.body;
  await konekcija.query(
    'INSERT INTO korisnik (ime, email, lozinka, uloga) VALUES (?, ?, ?, ?)',
    [ime, email, lozinka, uloga || 'kupac']
  );
  res.json({ poruka: 'Korisnik dodat' });
});
export default korisnikRuter;