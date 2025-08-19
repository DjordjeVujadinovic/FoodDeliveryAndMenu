import { konekcija } from '../mysqlTabela/tabela';

export const sveStavke = async () => {
  const [rows] = await konekcija.query('SELECT * FROM stavka_porudzbine');
  return rows;
};
export const dodajStavku = async (porudzbina_id: number, jelo_id: number, kolicina: number) => {
  await konekcija.query(
    'INSERT INTO stavka_porudzbine (porudzbina_id, jelo_id, kolicina) VALUES (?, ?, ?)',
    [porudzbina_id, jelo_id, kolicina]
  );
};
