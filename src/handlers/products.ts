import { Request, Response, Application } from 'express';
import verifyToken from '../middleware/auth';
import { ProductStore } from '../models/product';

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  try {
    const products = await store.index();

    res.json(products);
  } catch (err) {
    throw new Error(`Handler: Cannot fetch products, Error: ${err}`);
  }
};

const show = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.send('Please provide a valid number');
  }

  try {
    const product = await store.show(id);

    if (!product) {
      return res.send('No product matches the provided id');
    }

    res.json(product);
  } catch (err) {
    throw new Error(`Handler: Cannot fetch product, Error: ${err}`);
  }
};

const create = async (req: Request, res: Response) => {
  const product = {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
  };

  try {
    const newProduct = await store.create(product);

    res.json(newProduct);
  } catch (err) {
    throw new Error(`Handler: Cannot create product, Error: ${err}`);
  }
};

const showByCategory = async (req: Request, res: Response) => {
  const category = req.params.category;

  try {
    const products = await store.categorize(category);

    if (products.length === 0) {
      return res.send('No products are found in this category');
    }

    res.json(products);
  } catch (err) {
    throw new Error(`Handler: Cannot find product category, Error: ${err}`);
  }
};

export const productsRouter = (app: Application) => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.get('/products/category/:category', showByCategory);
  app.post('/products', verifyToken, create);
};
