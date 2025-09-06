import { konekcija } from '../mysqlTabela/tabela';
export const svaJela = async () => {
  const [rows] = await konekcija.query('SELECT * FROM jela');
  return rows;
};
export const dodajJelo = async (naziv: string, cena: number) => {
  await konekcija.query('INSERT INTO jela (naziv, cena) VALUES (?, ?)', [naziv, cena]);
};
