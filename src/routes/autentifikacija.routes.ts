import { Router } from "express";
import { login,registracija } from "../kontroler/autentifikacija.controller";

const ruter = Router();
ruter.post("/register", registracija);
ruter.post("/login", login);

export default ruter;
