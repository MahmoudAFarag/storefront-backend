import bcrypt from "bcrypt";
import pool from "../db";

interface User {
  first_name: string;
  last_name: string;
  password: string;
}

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const connection = await pool.connect();
      const sql = `SELECT * FROM users`;
      const { rows } = await connection.query(sql);
      connection.release();

      return rows;
    } catch (err) {
      throw new Error(`Cannot fetch users, Error: ${err}`);
    }
  }

  async show(id: number): Promise<User> {
    try {
      const connection = await pool.connect();
      const sql = `SELECT * FROM users WHERE id = $1`;
      const { rows } = await connection.query(sql, [id]);
      connection.release();

      return rows[0];
    } catch (err) {
      throw new Error(`Cannot fetch user, Error: ${err}`);
    }
  }

  async create(user: User): Promise<User> {
    const saltRounds = parseInt(process.env.SALT_ROUNDS as string);
    try {
      const hash = await bcrypt.hash(user.password + process.env.BCRYPT_PASSWORD, saltRounds);
      const connection = await pool.connect();
      const sql = `INSERT INTO users (first_name, last_name, password) VALUES ($1, $2, $3) RETURNING *`;
      const { rows } = await connection.query(sql, [user.first_name, user.last_name, hash]);
      connection.release();

      return rows[0];
    } catch (err) {
      throw new Error(`Cannot create user, Error: ${err}`);
    }
  }

  async authenticate(user: User): Promise<User | null> {
    try {
      const connection = await pool.connect();
      const sql = `SELECT password FROM users WHERE first_name = $1 AND last_name = $2`;
      const { rows } = await connection.query(sql, [user.first_name, user.last_name]);
      const foundUserPass = rows[0]?.password;
      connection.release();

      if (foundUserPass) {
        const isValid = await bcrypt.compare(user.password + process.env.BCRYPT_PASSWORD, foundUserPass);

        if (isValid) {
          return foundUserPass;
        }
      }

      return null;
    } catch (err) {
      throw new Error(`Cannot authenticate, Error: ${err}`);
    }
  }
}
