import type { Request, Response } from 'express';
import { konekcija } from '../mysqlTabela/tabela';
export const sveStavke = async (req: Request, res: Response) => {
  try {
    const [rez] = await konekcija.query("SELECT * FROM stavka_porudzbine");
    res.json(rez);
  } catch (err) {
    res.status(500).json({ error: "Greška pri dohvaćanju stavki." });
  }
};
export const dodajStavku = async (req: Request, res: Response) => {
  const { porudzbina_id, jelo_id, kolicina } = req.body;
  try {
    await konekcija.query(
      "INSERT INTO stavka_porudzbine (porudzbina_id, jela_id, kolicina) VALUES (?, ?, ?)",
      [porudzbina_id, jelo_id, kolicina]
    );
    res.json({ poruka: "Stavka dodata" });
  } catch (err) {
    res.status(500).json({ error: "Greška pri dodavanju stavke." });
  }
};
export const izmeniStavku = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { porudzbina_id, jelo_id, kolicina } = req.body;
  try {
    await konekcija.query(
      "UPDATE stavka_porudzbine SET porudzbina_id = ?, jelo_id = ?, kolicina = ? WHERE id = ?",
      [porudzbina_id, jelo_id, kolicina, id]
    );
    res.json({ poruka: "Stavka izmenjena" });
  } catch (err) {
    res.status(500).json({ error: "Greška pri izmeni stavke." });
  }
};
export const obrisiStavku = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await konekcija.query("DELETE FROM stavka_porudzbine WHERE id = ?", [id]);
    res.json({ poruka: "Stavka obrisana" });
  } catch (err) {
    res.status(500).json({ error: "Greška pri brisanju stavke." });
  }
};