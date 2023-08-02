import { Pool } from "https://deno.land/x/pg@v0.6.1/mod.ts";
import { logger } from '/deps.ts';

export class Database {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      user: process.env.PG_USER,
      host: process.env.PG_HOST,
      database: process.env.PG_DATABASE,
      password: process.env.PG_PASSWORD,
      port: Number(process.env.PG_PORT),
    });
  }
 
  /**
   * Store Fear & Greed Index in the database.
   *
   * @param {string} index - The Fear & Greed Index value.
   */
  async storeFearGreedIndex(index: string): Promise<void> {
    const client = await this.pool.connect();

    try {
      await client.query('INSERT INTO fear_greed_index(value, date) VALUES($1, $2)', [index, new Date()]);
    } catch (err) {
      console.error('Error storing Fear & Greed Index:', err);
    } finally {
      client.release();
    }
  }
}
