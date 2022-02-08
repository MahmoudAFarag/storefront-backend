import supertest from 'supertest';
import { app } from '../../server';

const request = supertest(app);

describe('Orders Router Endpoint', () => {
  const data = {
    quantity: 4,
    product_id: 1,
    user_id: 1,
  };

  let token = '';

  beforeAll(async () => {
    const user = await request.post('/users').set('Content-Type', 'application/json').send({
      first_name: 'Jennifer',
      last_name: 'Hudson',
      password: 'noteasy',
    });

    token = user.text.replaceAll('"', '');

    await request
      .post('/products')
      .set('Authorization', 'Bearer ' + token)
      .set('Content-Type', 'application/json')
      .send({
        name: 'Sofra',
        price: 1500,
        category: 'Living Room',
      });
  });

  it('should create a new order', async () => {
    const order = await request
      .post('/orders')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + token)
      .send(data);

    expect(order.statusCode).toBe(200);
    expect(order.text).toContain('id');
    expect(order.body.status).toEqual('active');
  });

  it('should get order by user id', async () => {
    const order = await request.get('/orders/1').set('Authorization', 'Bearer ' + token);

    expect(order.statusCode).toBe(200);
    expect(order.body[0].user_id).toEqual(1);
    expect(order.body[0].status).toEqual('active');
  });

  it('should return completed orders by user', async () => {
    const completedOrders = await request
      .post('/orders')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + token)
      .send({
        quantity: 4,
        product_id: 1,
        user_id: 1,
        status: 'complete',
      });

    expect(completedOrders.statusCode).toBe(200);
    expect(completedOrders.text).toContain('complete');
  });
});
