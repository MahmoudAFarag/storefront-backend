import pool from '../db';

interface Order {
  quantity: number;
  user_id: number;
  status?: string;
}

export class OrderStore {
  async createOrder(order: Order): Promise<Order> {
    const status = order.status ?? 'active';
    try {
      const connection = await pool.connect();
      const sql = `INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *`;
      const { rows } = await connection.query(sql, [order.user_id, status]);
      connection.release();

      return rows[0];
    } catch (err) {
      throw new Error(`Cannot create order, Error: ${err}`);
    }
  }

  async getUserOrder(user_id: number): Promise<Order[]> {
    try {
      const connection = await pool.connect();
      const sql = `SELECT * FROM orders WHERE user_id = $1`;
      const { rows } = await pool.query(sql, [user_id]);
      connection.release();

      return rows;
    } catch (err) {
      throw new Error(`Cannot fetch orders, Error: ${err}`);
    }
  }

  async getCompletedOrders(user_id: number) {
    try {
      const connection = await pool.connect();
      const sql = `SELECT * FROM orders WHERE user_id = $1 AND status = 'complete'`;
      const { rows } = await connection.query(sql, [user_id]);
      connection.release();

      return rows;
    } catch (err) {
      throw new Error(`Cannot fetch orders, Error: ${err}`);
    }
  }
}
