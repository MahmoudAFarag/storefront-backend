import { Pool } from "pg";

const { POSTGRES_HOST, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_DB_TEST, ENV } = process.env;

console.log(`Launching ${ENV} environment`);

const pool = new Pool({
  host: POSTGRES_HOST,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: ENV === "test" ? POSTGRES_DB_TEST : POSTGRES_DB,
  port: 5432,
});

export default pool;
