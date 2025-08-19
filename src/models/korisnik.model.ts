import { konekcija } from '../mysqlTabela/tabela';

export const sviKorisnici = async () => {
  const [rows] = await konekcija.query('SELECT * FROM korisnik');
  return rows;
};
export const dodajKorisnika = async (ime: string, email: string) => {
  await konekcija.query('INSERT INTO korisnik (ime, email) VALUES (?, ?)', [ime, email]);
};
