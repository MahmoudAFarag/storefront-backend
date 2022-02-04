import { Request, Response, Application } from "express";
import { ProductStore } from "../models/product";

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  const products = await store.index();
  res.json(products);
};

const show = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const product = await store.show(id);

  if (!product) {
    return res.send("No product matches the provided id");
  }

  res.json(product);
};

const create = async (req: Request, res: Response) => {
  const product = {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
  };

  const newProduct = await store.create(product);
  res.json(newProduct);
};

export const productsRouter = (app: Application) => {
  app.get("/products", index);
  app.get("/products/:id", show);
  app.post("/products", create);
};
