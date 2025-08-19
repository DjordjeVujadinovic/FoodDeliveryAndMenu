import { Router } from 'express';
import { svePorudzbineSaStavkama, izmeniPorudzbinu, obrisiPorudzbinu } from '../kontroler/porduzbina.controller';

const porudzbinaRuter = Router();


porudzbinaRuter.get("/detaljno", svePorudzbineSaStavkama);
porudzbinaRuter.put("/:id", izmeniPorudzbinu);
porudzbinaRuter.delete("/:id", obrisiPorudzbinu);
export default porudzbinaRuter;
