import { ProductStore } from '../../models/product';

const store = new ProductStore();

describe('Product Model', () => {
  it('should be defined', () => {
    expect(store).toBeDefined();
  });

  it('should create a new product', async () => {
    const product = {
      name: 'Soap',
      price: 100,
      category: 'Bathroom',
    };

    const newProduct = await store.create(product);

    expect(newProduct).toBeDefined();
    expect(newProduct.name).toBe(product.name);
  });

  it('should get all products', async () => {
    const products = await store.index();

    expect(products).toBeDefined();
    expect(products.length).toBeGreaterThan(0);
  });

  it('should get product by id', async () => {
    const product = await store.show(1);

    expect(product).toBeDefined();
    expect(product.name).toBeTruthy();
  });

  it('should get product by category', async () => {
    const products = await store.categorize('Bathroom');

    expect(products).toBeDefined();
    expect(products.length).toBeGreaterThan(0);
  });
});
