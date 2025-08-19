import { Router } from 'express';
import { sveStavke, dodajStavku, izmeniStavku, obrisiStavku } from '../kontroler/stavka.porudzbina';
const stavkaRuter = Router();
stavkaRuter.get("/", sveStavke);
stavkaRuter.post("/", dodajStavku);
stavkaRuter.put("/:id", izmeniStavku);
stavkaRuter.delete("/:id", obrisiStavku);

export default stavkaRuter;
