import { konekcija } from '../mysqlTabela/tabela';

export const svaJela = async () => {
  const [rows] = await konekcija.query('SELECT * FROM jelo');
  return rows;
};
export const dodajJelo = async (naziv: string, cena: number) => {
  await konekcija.query('INSERT INTO jelo (naziv, cena) VALUES (?, ?)', [naziv, cena]);
};
