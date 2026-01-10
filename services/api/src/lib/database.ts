import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const connectToDB = async () => {
  try {
    await pool.connect();
    console.log('Connected to PostgreSQL');
  } catch (err) {
    if (err instanceof Error) {
      console.error('Connection error', err.stack);
    } else {
      console.error('An unknown error occurred during DB connection', err);
    }
  }
};

export default pool;
