import type { Request, Response } from "express";
import { konekcija } from '../mysqlTabela/tabela';
export const svePorudzbine = async (req: Request, res: Response) => {
  try {
    const [rez] = await konekcija.query('SELECT * FROM porudzbina ORDER BY id DESC');
    res.json(rez);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Greška pri prikazu porudžbina." });
  }
};
export const svePorudzbineSaStavkama = async (req: Request, res: Response) => {
  try {
    const [rez] = await konekcija.query(`
      SELECT   p.id AS porudzbina_id,  p.datum,  p.status,  k.ime AS korisnik_ime,  s.id AS stavka_id,  j.naziv AS jela_naziv,
        s.kolicina
      FROM porudzbina p
      JOIN korisnik k ON p.korisnik_id = k.id
      LEFT JOIN stavka_porudzbine s ON p.id = s.porudzbina_id
      LEFT JOIN jela j ON s.jelo_id = j.id
      ORDER BY p.id DESC
    `);
    res.json(rez);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Greška pri prikazu detaljnih porudžbina." });
  }
};
export const kreirajPorudzbinu = async (req: Request, res: Response) => {
  const korisnikId = (req as any).user?.id || null;
  const { stavke } = req.body;
  if (!stavke || !Array.isArray(stavke) || stavke.length === 0) {
    return res.status(400).json({ error: "Porudžbina mora da sadrži artikle" });
  }
  try {
    const [rez]: any = await konekcija.query(
      "INSERT INTO porudzbina (korisnik_id, datum, status) VALUES (?, NOW(), ?)",
      [korisnikId, "u toku"]
    );
    const porudzbinaId = rez.insertId;
    for (const s of stavke) {
      await konekcija.query(
        "INSERT INTO stavka_porudzbine (porudzbina_id, jelo_id, kolicina) VALUES (?, ?, ?)",
        [porudzbinaId, s.id, s.kolicina || 1]
      );
    }
    res.json({ poruka: "Porudžbina uspešno kreirana", porudzbinaId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Greška pri kreiranju porudžbine." });
  }
};
export const izmeniPorudzbinu = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { korisnik_id, datum, status } = req.body;
  try {
    await konekcija.query(
      "UPDATE porudzbina SET korisnik_id = ?, datum = ?, status = ? WHERE id = ?",
      [korisnik_id, datum, status, id]
    );
    res.json({ poruka: "Porudžbina izmenjena" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Greška pri izmeni porudžbine." });
  }
};
export const potvrdiPorudzbinu = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const [rez] = await konekcija.query(
      "UPDATE porudzbina SET status = 'potvrdjena' WHERE id = ?",
      [id]
    );
    const affectedRows = (rez as any).affectedRows;
    if (affectedRows === 0) {
      return res.status(404).json({ error: "Porudžbina nije pronađena" });
    }
    res.json({ poruka: "Porudžbina potvrđena" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Greška pri potvrdi porudžbine." });
  }
};


export const obrisiPorudzbinu = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await konekcija.query("DELETE FROM porudzbina WHERE id = ?", [id]);
    res.json({ poruka: "Porudžbina obrisana" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Greška pri brisanju porudžbine." });
  }
};
