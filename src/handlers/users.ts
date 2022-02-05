import { Request, Response, Application } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { UserStore } from "../models/user";
import verifyToken from "../middleware/auth";

const store = new UserStore();

const index = async (req: Request, res: Response) => {
  const users = await store.index();

  res.json(users);
};

const show = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.send("Please provide a valid number");
  }

  const user = await store.show(id);

  if (!user) {
    return res.send("No user matches the provided id");
  }

  res.json(user);
};

const create = async (req: Request, res: Response) => {
  const user = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: req.body.password,
  };
  const tokenSecret = process.env.TOKEN_SECRET as Secret;

  const newUser = await store.create(user);
  const token = jwt.sign({ user: newUser }, tokenSecret, {
    expiresIn: "1800s",
  });

  res.json(token);
};

const authenticate = async (req: Request, res: Response) => {
  const user = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: req.body.password,
  };
  const tokenSecret = process.env.TOKEN_SECRET as Secret;

  const foundUser = await store.authenticate(user);

  if (!foundUser) {
    return res.send("Wrong credintials");
  }

  const token = jwt.sign({ user: foundUser }, tokenSecret, {
    expiresIn: "1800s",
  });

  res.json(token);
};

export const usersRouter = (app: Application) => {
  app.get("/users", verifyToken, index);
  app.get("/users/:id", verifyToken, show);
  app.post("/users", create);
  app.post("/users/auth", authenticate);
};
