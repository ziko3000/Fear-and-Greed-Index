import { Client } from 'discordjs';
import { logger } from '/deps.ts';
import { CommandHandler } from './commandHandler.ts';
import { FearGreedIndexAPI } from './api.ts';
import { BotEvents } from './botEvents.ts';
import { BotService } from './botService.ts';


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
  // database: Database = new Database();

  /**
   * The bot events instance.
   * @type {BotEvents}
   */
  botEvents: BotEvents = new BotEvents(this.client, this.api, this.commandHandler);

  /**
   * The bot service instance.
   * @type {BotService}
   */
  botService: BotService = new BotService(this.api);

  /**
   * Logs in the Bot using the token from environment variables and starts storing Fear & Greed Index.
   * @return {void}
   */
  login(): void {
    this.client.login(Deno.env.get('BOT_TOKEN'));
    // this.botService.storeFearGreedIndex();
  }
}

logger.info('Starting the bot...');
// Create a new Bot instance and login
new Bot().login();
