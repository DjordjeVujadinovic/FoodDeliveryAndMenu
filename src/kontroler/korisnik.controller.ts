import type { Request, Response } from "express";
import { konekcija } from '../mysqlTabela/tabela';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const JWT_SECRET = "tajni_kljuc";
export const sviKorisnici = async (req: Request, res: Response) => {
  try {
    const [rez] = await konekcija.query("SELECT id, ime, email, uloga FROM korisnik");
    res.json(rez);
  } catch (err) {
    res.status(500).json({ error: "Greška pri prikazu korisnika." });
  }
};
export const dodajKorisnika = async (req: Request, res: Response) => {
  const { ime, email, lozinka, uloga } = req.body;
  if (!ime || !email || !lozinka) {
    return res.status(400).json({ message: "Sva polja su obavezna" });
  }
  try {

    const [postojeci]: any = await konekcija.query(
      "SELECT id FROM korisnik WHERE email = ?",
      [email]
    );
    if (postojeci.length) {
      return res.status(409).json({ message: "Korisnik sa ovim emailom već postoji" });
    }
    const hash = await bcrypt.hash(lozinka, 10);
    const [rez]: any = await konekcija.query(
      "INSERT INTO korisnik (ime, email, lozinka, uloga) VALUES (?, ?, ?, ?)",
      [ime, email, hash, uloga || "kupac"]
    );

    const id = rez.insertId;
    const role = uloga || "kupac";
    const token = jwt.sign({ id, email, uloga: role }, JWT_SECRET, { expiresIn: "2h" });

    return res.json({ token, id, role, ime });
  } catch (err) {
    return res.status(500).json({ message: "Greška pri registraciji" });
  }
};

export const loginKorisnika = async (req: Request, res: Response) => {
  const { email, lozinka } = req.body;
  try {
    const [korisnici]: any = await konekcija.query(
      "SELECT * FROM korisnik WHERE email = ?",
      [email]
    );
    if (!korisnici.length) {
      return res.status(404).json({ message: "Korisnik ne postoji" });
    }
    const korisnik = korisnici[0];
    const validna = await bcrypt.compare(lozinka, korisnik.lozinka);
    if (!validna) {
      return res.status(401).json({ message: "Pogrešna lozinka" });
    }

    const token = jwt.sign(
      { id: korisnik.id, email: korisnik.email, uloga: korisnik.uloga },
      JWT_SECRET,
      { expiresIn: "2h" }
    );
    return res.json({
      token,
      korisnik: {
        id: korisnik.id,
        ime: korisnik.ime,
        uloga: korisnik.uloga,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: "Greška pri prijavi" });
  }
};

export const izmeniKorisnika = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ime, email, lozinka, uloga } = req.body;
  try {
    let upit = "UPDATE korisnik SET ime = ?, email = ?, uloga = ? WHERE id = ?";
    let vrednosti: any[] = [ime, email, uloga, id];
    if (lozinka) {
      const hash = await bcrypt.hash(lozinka, 10);
      upit = "UPDATE korisnik SET ime = ?, email = ?, lozinka = ?, uloga = ? WHERE id = ?";
      vrednosti = [ime, email, hash, uloga, id];
    }
    await konekcija.query(upit, vrednosti);
    res.json({ poruka: "Korisnik izmenjen" });
  } catch (err) {
    res.status(500).json({ error: "Greška pri izmeni korisnika." });
  }
};
export const obrisiKorisnika = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await konekcija.query("DELETE FROM korisnik WHERE id = ?", [id]);
    res.json({ poruka: "Korisnik obrisan" });
  } catch (err) {
    res.status(500).json({ error: "Greška pri brisanju korisnika." });
  }
};
