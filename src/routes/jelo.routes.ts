import { Router } from 'express';
import { svaJela, dodajJelo, izmeniJelo, obrisiJelo  } from '../kontroler/jelo.controller';

const jeloRuter = Router();


jeloRuter.get("/", svaJela);
jeloRuter.post("/", dodajJelo);
jeloRuter.put("/:id", izmeniJelo);
jeloRuter.delete("/:id", obrisiJelo);


export default jeloRuter;
