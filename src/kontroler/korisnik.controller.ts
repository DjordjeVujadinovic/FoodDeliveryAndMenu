import type { Request, Response } from "express";
import { konekcija } from '../mysqlTabela/tabela';

// Svi korisnici
export const sviKorisnici = async (req: Request, res: Response) => {
  try {
    const [rez] = await konekcija.query("SELECT * FROM korisnik");
    res.json(rez);
  } catch (err) {
    res.status(500).json({ error: "Greška pri dohvaćanju korisnika." });
  }
};

// Novi korisnik
export const dodajKorisnika = async (req: Request, res: Response) => {
  const { ime, email, lozinka, uloga } = req.body;
  try {
    await konekcija.query(
      "INSERT INTO korisnik (ime, email, lozinka, uloga) VALUES (?, ?, ?, ?)",
      [ime, email, lozinka, uloga || "kupac"]
    );
    res.json({ poruka: "Korisnik dodat" });
  } catch (err) {
    res.status(500).json({ error: "Greška pri dodavanju korisnika." });
  }
};

// Izmena korisnika
export const izmeniKorisnika = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ime, email, lozinka, uloga } = req.body;
  try {
    await konekcija.query(
      "UPDATE korisnik SET ime = ?, email = ?, lozinka = ?, uloga = ? WHERE id = ?",
      [ime, email, lozinka, uloga, id]
    );
    res.json({ poruka: "Korisnik izmenjen" });
  } catch (err) {
    res.status(500).json({ error: "Greška pri izmeni korisnika." });
  }
};

// Brisanje korisnika
export const obrisiKorisnika = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await konekcija.query("DELETE FROM korisnik WHERE id = ?", [id]);
    res.json({ poruka: "Korisnik obrisan" });
  } catch (err) {
    res.status(500).json({ error: "Greška pri brisanju korisnika." });
  }
};
