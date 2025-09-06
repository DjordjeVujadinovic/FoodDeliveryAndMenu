import type { Request, Response } from 'express';
import { konekcija } from '../mysqlTabela/tabela';
export const svaJela = async (req: Request, res: Response) => {
  try {
    const [rez] = await konekcija.query("SELECT * FROM jela");
    res.json(rez);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Greška pri dohvaćanju jela." });
  }


};
export const dodajJelo = async (req: Request, res: Response) => {
  console.log("req.body:", req.body);
  const { naziv, opis, cena, slika } = req.body;
  try {
    await konekcija.query(
      "INSERT INTO jela (naziv, opis, cena, slika) VALUES (?, ?, ?, ?)",
      [naziv, opis || '', cena, slika || '']
    );
    res.json({ poruka: "Jelo dodato" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Greška pri dodavanju jela." });
  }
};
export const izmeniJelo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { naziv, opis, cena, slika } = req.body;
  try {
    await konekcija.query(
      "UPDATE jela SET naziv = ?, opis = ?, cena = ?, slika = ? WHERE id = ?",
      [naziv, opis || '', cena, slika || '', id]
    );
    res.json({ poruka: "Jelo izmenjeno" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Greška pri izmeni jela." });
  }
};
export const obrisiJelo = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await konekcija.query("DELETE FROM jela WHERE id = ?", [id]);
    res.json({ poruka: "Jelo obrisano" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Greška pri brisanju jela." });
  }
};
