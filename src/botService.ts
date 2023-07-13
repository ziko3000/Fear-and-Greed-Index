import { FearGreedIndexAPI } from './api';
import { Database } from './database';

/**
 * Service class for bot operations.
 * @constructor
 * @param {FearGreedIndexAPI} api - The API instance.
 * @param {Database} database - The Database instance.
 */
export class BotService {
  api: FearGreedIndexAPI;
  database: Database;

  constructor(api: FearGreedIndexAPI, database: Database) {
    this.api = api;
    this.database = database;
  }

  /**
   * Fetches the Fear and Greed Index from the API and stores it in the database.
   * This operation is scheduled to run every 24 hours.
   * @return {Promise<void>}
   */
  async storeFearGreedIndex(): Promise<void> {
    setInterval(async () => {
      try {
        // Fetch the Fear and Greed Index from the API
        const fearGreedIndex = await this.api.getFearGreedIndex();

        // Store the Fear and Greed Index in the database
        await this.database.storeFearGreedIndex(fearGreedIndex);

        console.log('Fear & Greed Index stored successfully');
      } catch (err) {
        console.error('Failed to store Fear & Greed Index:', err);
      }
    }, 86400000); // 24 hours in milliseconds
  }
}
