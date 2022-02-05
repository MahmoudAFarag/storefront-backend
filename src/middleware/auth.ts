import { Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";

const verifyToken = async (req: Request, res: Response, next: Function) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1] as string;
    const tokenSecret = process.env.TOKEN_SECRET as Secret;

    jwt.verify(token, tokenSecret);

    next();
  } catch (err) {
    res.status(401).send(`Not Authorized`);
  }
};

export default verifyToken;
