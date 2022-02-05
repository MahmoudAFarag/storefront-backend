import { Request, Response, Application } from "express";
import { ProductStore } from "../models/product";

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  const products = await store.index();
  res.json(products);
};

const show = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.send("Please provide a valid number");
  }

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

const showByCategory = async (req: Request, res: Response) => {
  const category = req.params.category;
  const products = await store.categorize(category);

  if (products.length === 0) {
    return res.send("No products are found in this category");
  }
  res.json(products);
};

export const productsRouter = (app: Application) => {
  app.get("/products", index);
  app.get("/products/:id", show);
  app.get("/products/category/:category", showByCategory);
  app.post("/products", create);
};
