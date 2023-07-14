import { Client } from 'discord.js';
import { config as dotenvConfig } from  'dotenv';
import { CommandHandler } from './commands/CommandHandler';
import { FearGreedIndexAPI } from './api';
import { Database } from './database';
import { BotEvents } from './botEvents';
import { BotService } from './botService';

// Load environment variables
dotenvConfig();

/**
 * Represents the Discord Bot.
 * @constructor
 */
class Bot {
  /**
   * The Discord.js client instance.
   * @type {Client}
   */
  client: Client = new Client({ intents: 8 });

  /**
   * The Fear and Greed Index API instance.
   * @type {FearGreedIndexAPI}
   */
  api: FearGreedIndexAPI = new FearGreedIndexAPI;

  /**
   * The command handler instance.
   * @type {CommandHandler}
   */
  commandHandler: CommandHandler = new CommandHandler();

  /**
   * The database instance.
   * @type {Database}
   */
  database: Database = new Database();

  /**
   * The bot events instance.
   * @type {BotEvents}
   */
  botEvents: BotEvents = new BotEvents(this.client, this.api, this.commandHandler, this.database);

  /**
   * The bot service instance.
   * @type {BotService}
   */
  botService: BotService = new BotService(this.api, this.database);

  /**
   * Logs in the Bot using the token from environment variables and starts storing Fear & Greed Index.
   * @return {void}
   */
  login(): void {
    this.client.login(process.env.BOT_TOKEN);
    // this.botService.storeFearGreedIndex();
  }
}

// Create a new Bot instance and login
new Bot().login();
