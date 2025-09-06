import { Request, Response, NextFunction } from "express";
export const samoAdmin = (req: Request, res: Response, next: NextFunction) => {
  const korisnik = (req as any).korisnik;
  if (korisnik?.uloga !== "admin") {
    return res.status(403).json({ error: "Samo admin ima pristup" });
  }
  next();
};
