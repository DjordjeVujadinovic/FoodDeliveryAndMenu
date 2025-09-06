import type { Request, Response } from "express";
import { konekcija } from "../mysqlTabela/tabela";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const JWT_SECRET = "tajni_kljuc";
export const registracija = async (req: Request, res: Response) => {
  const { ime, email, lozinka, uloga } = req.body;
  const hesovana = await bcrypt.hash(lozinka, 10);
  try {
    const [rez]: any = await konekcija.query(
      "INSERT INTO korisnik (ime, email, lozinka, uloga) VALUES (?, ?, ?, ?)",
      [ime, email, hesovana, uloga || "kupac"]
    );
    const noviId = rez.insertId;
    const token = jwt.sign(
      { id: noviId, email, uloga: uloga || "kupac" },
      JWT_SECRET,
      { expiresIn: "2h" }
    );
    res.json({
      token,
      id: noviId,
      role: uloga || "kupac",
      ime,
    });
  } catch (err) {
    res.status(500).json({ error: "Greška pri registraciji" });
  }
};
export const login = async (req: Request, res: Response) => {
  const { email, lozinka } = req.body;
  const [korisnici]: any = await konekcija.query(
    "SELECT * FROM korisnik WHERE email = ?",
    [email]
  );
  if (!korisnici.length) return res.status(404).json({ error: "Korisnik ne postoji" });
  const korisnik = korisnici[0];
  const validna = await bcrypt.compare(lozinka, korisnik.lozinka);
  if (!validna) return res.status(401).json({ error: "Pogrešna lozinka" });
  const token = jwt.sign(
    { id: korisnik.id, email: korisnik.email, uloga: korisnik.uloga },
    JWT_SECRET,
    { expiresIn: "2h" }
  );
  res.json({
    token,
    korisnik: {id: korisnik.id,ime: korisnik.ime,uloga: korisnik.uloga,
    },
  });
};
