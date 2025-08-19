import type { Request, Response } from "express";
import { konekcija } from '../mysqlTabela/tabela';

export const svePorudzbineSaStavkama = async (req: Request, res: Response) => {
  try {
    const [rez] = await konekcija.query(`
      SELECT 
        p.id AS porudzbina_id,
        p.datum,
        k.ime AS korisnik_ime,
        s.id AS stavka_id,
        j.naziv AS jelo_naziv,
        s.kolicina
      FROM porudzbina p
      JOIN korisnik k ON p.korisnik_id = k.id
      JOIN stavka_porudzbine s ON p.id = s.porudzbina_id
      JOIN jelo j ON s.jelo_id = j.id
      ORDER BY p.id DESC
    `);
    res.json(rez);
  } catch (err) {
    res.status(500).json({ error: "Greška pri dohvaćanju porudžbina." });
  }
};
export const izmeniPorudzbinu = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { korisnik_id, datum } = req.body;
  try {
    await konekcija.query(
      "UPDATE porudzbina SET korisnik_id = ?, datum = ? WHERE id = ?",
      [korisnik_id, datum, id]
    );
    res.json({ poruka: "Porudžbina izmenjena" });
  } catch (err) {
    res.status(500).json({ error: "Greška pri izmeni porudžbine." });
  }
};
export const obrisiPorudzbinu = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await konekcija.query("DELETE FROM porudzbina WHERE id = ?", [id]);
    res.json({ poruka: "Porudžbina obrisana" });
  } catch (err) {
    res.status(500).json({ error: "Greška pri brisanju porudžbine." });
  }
};
