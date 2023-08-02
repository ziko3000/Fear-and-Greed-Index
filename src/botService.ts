import { FearGreedIndexAPI } from './api.ts';
import { Database } from './database.ts';

/**
 * Service class for bot operations.
 * @constructor
 * @param {FearGreedIndexAPI} api - The API instance.
 * @param {Database} database - The Database instance.
 */
export class BotService {
  api: FearGreedIndexAPI;

  constructor(api: FearGreedIndexAPI) {
    this.api = api;
  }
 }
