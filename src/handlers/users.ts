import { Request, Response, Application } from "express";
import { UserStore } from "../models/user";

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

  const newUser = await store.create(user);

  res.json(newUser);
};

const authenticate = async (req: Request, res: Response) => {
  const user = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: req.body.password,
  };

  const foundUser = await store.authenticate(user);

  if (!foundUser) {
    return res.send("Wrong credintials");
  }

  res.json(foundUser);
};

export const usersRouter = (app: Application) => {
  app.get("/users", index);
  app.get("/users/:id", show);
  app.post("/users", create);
  app.post("/users/auth", authenticate);
};
