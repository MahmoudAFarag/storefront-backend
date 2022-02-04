import pool from "../db";

interface Product {
  name: string;
  price: number;
  category: string;
}

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const connection = await pool.connect();
      const sql = `SELECT * FROM products`;
      const { rows } = await connection.query(sql);
      connection.release();

      return rows;
    } catch (e) {
      throw new Error(`Model: Cannot fetch products, ${e}`);
    }
  }

  async show(id: number): Promise<Product> {
    try {
      const connection = await pool.connect();
      const sql = `SELECT * FROM products WHERE id=$1`;
      const { rows } = await connection.query(sql, [id]);
      connection.release();

      return rows[0];
    } catch (e) {
      throw new Error(`Model: Cannot get product, ${e}`);
    }
  }

  async create(product: Product): Promise<Product> {
    try {
      const connection = await pool.connect();
      const sql = `INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *`;
      const { rows } = await connection.query(sql, [product.name, product.price, product.category]);
      connection.release();

      return rows[0];
    } catch (e) {
      throw new Error(`Model: Cannot create product, ${e}`);
    }
  }
}
