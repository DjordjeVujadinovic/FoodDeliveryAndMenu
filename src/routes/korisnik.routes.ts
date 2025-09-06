import { Router } from 'express';
import { sviKorisnici, dodajKorisnika,  izmeniKorisnika,  obrisiKorisnika,  loginKorisnika} from '../kontroler/korisnik.controller';
const korisnikRuter = Router();
korisnikRuter.get("/", sviKorisnici);
korisnikRuter.post("/", dodajKorisnika);
korisnikRuter.post("/login", loginKorisnika);
korisnikRuter.put("/:id", izmeniKorisnika);
korisnikRuter.delete("/:id", obrisiKorisnika);
export default korisnikRuter;
