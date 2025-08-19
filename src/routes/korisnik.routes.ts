import { Router } from 'express';
import { sviKorisnici,dodajKorisnika,izmeniKorisnika,obrisiKorisnika } from '../kontroler/korisnik.controller';

const korisnikRuter = Router();

korisnikRuter.get("/", sviKorisnici);
korisnikRuter.post("/", dodajKorisnika);
korisnikRuter.put("/:id", izmeniKorisnika);
korisnikRuter.delete("/:id", obrisiKorisnika);

export default korisnikRuter;