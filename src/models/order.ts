import pool from "../db";

interface Order {
  quantity: number;
  product_id: number;
  user_id: number;
  status: string;
}

export class OrderStore {
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
