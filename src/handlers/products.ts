import { Request, Response, Application } from "express";
import { ProductStore } from "../models/products";

const store = new ProductStore();

const index = async (req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (e) {
    throw new Error(`Handler: Cannot fetch products, ${e}`);
  }
};

const show = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    const product = await store.show(id);

    if (!product) {
      return res.send("No product matches the provided id");
    }

    res.json(product);
  } catch (e) {
    throw new Error(`Handler: Cannot fetch product, ${e}`);
  }
};

const create = async (req: Request, res: Response) => {
  const product = {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
  };

  try {
    const result = await store.create(product);
    res.json(result);
  } catch (e) {
    throw new Error(`Handler: Cannot create product, ${e}`);
  }
};

export const productsRouter = (app: Application) => {
  app.get("/products", index);
  app.get("/products/:id", show);
  app.post("/products", create);
};
