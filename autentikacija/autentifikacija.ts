import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
export const verifikujToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Nema tokena" });
  try {
    const dekodiran = jwt.verify(token, "tajni_kljuc") as any;
    (req as any).korisnik = dekodiran;
    next();
  } catch {
    res.status(403).json({ error: "Nevažeći token" });
  }
};
