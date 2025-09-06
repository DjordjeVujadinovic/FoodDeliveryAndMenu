import mysql from 'mysql2/promise';
export const konekcija = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'keteringtabele',
});
