import { konekcija } from '../mysqlTabela/tabela';
export const svePorudzbine = async () => {
  const [rows] = await konekcija.query('SELECT * FROM porudzbina');
  return rows;
};
export const dodajPorudzbinu = async (korisnik_id: number, datum: string) => {
  await konekcija.query(
    'INSERT INTO porudzbina (korisnik_id, datum) VALUES (?, ?)',
    [korisnik_id, datum]
  );
};
