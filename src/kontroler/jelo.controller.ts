import type{Request,Response}from 'express';
import {konekcija} from'../mysqlTabela/tabela';

export const svaJela = async(req:Request,res:Response)=>{
  try{
    const [rez] = await konekcija.query("SELECT * FROM jelo");
    res.json(rez);
  } 
  catch(err) 
  {
    res.status(500).json({ error: "Greška pri dohvaćanju jela." });
  }
};
export const dodajJelo =async(req:Request,res:Response) => {
  const{naziv,opis,cena} =req.body;
  try{
    await konekcija.query(
      "INSERT INTO jelo (naziv, opis, cena) VALUES (?, ?, ?)",
      [naziv, opis, cena]
    );
    res.json({ poruka: "Jelo dodato" });
  }catch(err){
    res.status(500).json({ error: "Greška pri dodavanju jela." });
  }
}
export const izmeniJelo = async (req: Request, res: Response) => {
  const {id} = req.params;
  const {naziv,opis,cena} = req.body;
  try {await konekcija.query(
      "UPDATE jelo SET naziv = ?, opis = ?, cena = ? WHERE id = ?",
      [naziv, opis, cena, id]
    );
    res.json({ poruka: "Jelo izmenjeno" });
  } catch (err) { res.status(500).json({ error: "Greška pri izmeni jela." });
  }}
export const obrisiJelo = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await konekcija.query("DELETE FROM jelo WHERE id = ?", [id]);
    res.json({ poruka: "Jelo obrisano" });
  } catch (err) {
    res.status(500).json({ error: "Greška pri brisanju jela." });
  }
}