import { Router } from "express";
import {  svePorudzbineSaStavkama,  izmeniPorudzbinu,  obrisiPorudzbinu,  potvrdiPorudzbinu,} from "../kontroler/porduzbina.controller";
import { konekcija } from "../mysqlTabela/tabela";
import jwt from "jsonwebtoken";
const porudzbinaRuter = Router();
function auth(req: any, res: any, next: any) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ error: "Nema tokena." });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded: any = jwt.verify(token, "tajni_kljuc");
    req.korisnik = decoded;
    next();
  } catch (err) {
    console.error("Token istekao:", err);
    return res.status(403).json({ error: "Token istekao" });
  }
}
porudzbinaRuter.post("/", auth, async (req: any, res) => {
  try {
    const { stavke } = req.body;
    const korisnik_id = req.korisnik?.id;
    if (!korisnik_id) {
      return res.status(401).json({ error: "nisi ulogovan" });
    }
    if (!stavke || !Array.isArray(stavke) || stavke.length === 0) {
      return res.status(400).json({ error: "nisi ulogovan" });
    }
    const [rezultat]: any = await konekcija.query(
      "INSERT INTO porudzbina (korisnik_id, datum, status) VALUES (?, NOW(), 'u toku')",
      [korisnik_id]
    );
    const porudzbinaId = rezultat.insertId;
    for (const stavka of stavke) {
      await konekcija.query(
        "INSERT INTO stavka_porudzbine (porudzbina_id, jelo_id, kolicina) VALUES (?, ?, ?)",
        [porudzbinaId, stavka.id, stavka.kolicina || 1]
      );
    }
    res.json({ message: "Porudžbina uspešno kreirana!", id: porudzbinaId });
  } catch (err) {
    console.error("Gre[ka priliko kreiranja]:", err);
    res.status(500).json({ error: "Gre[ka priliko kreiranja]", detalji: err });
  }
});
porudzbinaRuter.get("/", async (req, res) => {
  try {
    const [rez] = await konekcija.query(
      "SELECT * FROM porudzbina ORDER BY id DESC"
    );
    res.json(rez);
  } catch (err) {
    console.error("Greška pri hvatanju poruzdbine:", err);
    res.status(500).json({ error: "Greška pri hvatanju poruzdbine" });
  }
});
porudzbinaRuter.get("/detaljno", svePorudzbineSaStavkama);
porudzbinaRuter.put("/:id", izmeniPorudzbinu);
porudzbinaRuter.put("/potvrdi/:id", potvrdiPorudzbinu);
porudzbinaRuter.delete("/:id", obrisiPorudzbinu);
export default porudzbinaRuter;

