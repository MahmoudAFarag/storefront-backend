import { Request, Response, Application } from 'express';
import verifyToken from '../middleware/auth';
import { OrderStore } from '../models/order';

const store = new OrderStore();

const createOrder = async (req: Request, res: Response) => {
  const newOrder = {
    quantity: req.body.quantity,
    product_id: req.body.product_id,
    user_id: req.body.user_id,
    status: req.body.status ?? 'active',
  };

  const order = await store.createOrder(newOrder);

  res.json(order);
};

const getUserOrder = async (req: Request, res: Response) => {
  const user_id = parseInt(req.params.user_id);
  const userOrders = await store.getUserOrder(user_id);

  if (userOrders.length === 0) {
    return res.status(404).send('No orders for the selected user');
  }

  res.json(userOrders);
};

const getCompletedOrders = async (req: Request, res: Response) => {
  const user_id = parseInt(req.params.user_id);
  const userCompletedOrders = await store.getCompletedOrders(user_id);

  if (userCompletedOrders.length === 0) {
    return res.status(404).send('No completed orders for the selected user');
  }

  res.json(userCompletedOrders);
};

export const ordersRouter = (app: Application) => {
  app.get('/orders/:user_id', verifyToken, getUserOrder);
  app.get('/orders/completed/:user_id', verifyToken, getCompletedOrders);
  app.post('/orders', verifyToken, createOrder);
};
