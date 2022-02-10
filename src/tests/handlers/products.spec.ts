import supertest from 'supertest';
import { app } from '../../server';

const request = supertest(app);

describe('Products Router Endpoint', () => {
  let token = '';

  beforeAll(async () => {
    try {
      const user = await request.post('/users').set('Content-Type', 'application/json').send({
        first_name: 'Jennifer',
        last_name: 'Hudson',
        password: 'noteasy',
      });

      token = user.text.replaceAll('"', '');
    } catch (err) {
      throw new Error(`Products Before All: Cannot create user, Error: ${err}`);
    }
  });

  it('should create a new product', async () => {
    const product = await request
      .post('/products')
      .set('Authorization', 'Bearer ' + token)
      .set('Content-Type', 'application/json')
      .send({
        name: 'Sofra',
        price: 1500,
        category: 'Living Room',
      });

    expect(product.statusCode).toBe(200);
    expect(product.body.price).toEqual(1500);
    expect(product.text).toContain('id');
  });

  it('should fetch all products', async () => {
    const products = await request.get('/products');

    expect(products.statusCode).toBe(200);
    expect(products.body.length).toBeGreaterThanOrEqual(1);
    expect(products.body[0].id).toBeTruthy();
  });

  it('should fetch product by id', async () => {
    const product = await request.get('/products/1');

    expect(product.statusCode).toBe(200);
    expect(product.body.id).toBeTruthy();
    expect(product.body.name).toEqual('Sofra');
  });

  it('should show products by category', async () => {
    const products = await request.get('/products/category/Living%20Room');

    expect(products.statusCode).toBe(200);
    expect(products.body.length).toBeGreaterThanOrEqual(1);
    expect(products.body[0].id).toBeTruthy();
  });
});
