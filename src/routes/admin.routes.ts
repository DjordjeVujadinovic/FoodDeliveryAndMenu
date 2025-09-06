import { Router } from "express";
import { konekcija } from "../mysqlTabela/tabela";
import jwt from "jsonwebtoken";
const adminRuter = Router();
function proveriAdmin(req: any, res: any, next: any) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ message: "Nema tokena" });
  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Nevažeći token" });
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "tajni_kljuc");
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Nemaš admin prava" });
    }
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token nije validan" });
  }
}
adminRuter.get("/korisnik", proveriAdmin, async (req, res) => {
  try {
    const [result] = await konekcija.query("SELECT id, ime, email, role FROM korisnik");
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});
adminRuter.delete("/korisnik/:id", proveriAdmin, async (req, res) => {
  try {
    await konekcija.query("DELETE FROM korisnik WHERE id = ?", [req.params.id]);
    res.json({ message: "Korisnik obrisan" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});
adminRuter.post("/jela", proveriAdmin, async (req, res) => {
  const { naziv, opis, cena } = req.body;
  try {
    await konekcija.query("INSERT INTO jela (naziv, opis, cena) VALUES (?, ?, ?)", [naziv, opis, cena]);
    res.json({ message: "Jelo dodato" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});
adminRuter.put("/jela/:id", proveriAdmin, async (req, res) => {
  const { naziv, opis, cena } = req.body;
  try {
    await konekcija.query("UPDATE jela SET naziv=?, opis=?, cena=? WHERE id=?", [naziv, opis, cena, req.params.id]);
    res.json({ message: "Jelo ažurirano" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});
adminRuter.delete("/jela/:id", proveriAdmin, async (req, res) => {
  try {
    await konekcija.query("DELETE FROM jela WHERE id=?", [req.params.id]);
    res.json({ message: "Jelo obrisano" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});
export default adminRuter;
