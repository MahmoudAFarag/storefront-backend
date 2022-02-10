import { OrderStore } from '../../models/order';

const store = new OrderStore();

describe('Order Model', () => {
  it('should be defined', () => {
    expect(store).toBeDefined();
  });

  it('create a new order', async () => {
    const order = {
      user_id: 1,
    };

    const newOrder = await store.createOrder(order);

    expect(newOrder).toBeDefined();
    expect(newOrder.user_id).toBe(order.user_id);
  });

  it('should get user order', async () => {
    const userOrder = await store.getUserOrder(1);

    expect(userOrder).toBeDefined();
    expect(userOrder.length).toBeGreaterThan(0);
  });

  it('completed orders', async () => {
    const completedOrders = await store.getCompletedOrders(1);

    expect(completedOrders).toBeDefined();
    expect(completedOrders.length).toBeGreaterThan(0);
  });
});
