// Import necessary packages
import { Client, ActivityType, Interaction, CommandInteraction } from 'discord.js';
import { FearGreedIndexAPI } from './api';
import { config as dotenvConfig } from  'dotenv';
import { CommandHandler } from './commands';
// import { Database } from './database';

// Load environment variables
dotenvConfig();

/**
 * Represents a Discord Bot.
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
  commandHandler: CommandHandler = new CommandHandler;

  /**
   * The database instance.
   * @type {Database}
   */
  // database = new Database();

  /**
   * @constructs Bot instance and sets up event listeners.
   */
  constructor() {
    this.client.on('ready', () => this.onReady());
    this.client.on('interactionCreate', async (interaction: Interaction) => {
      if (interaction.isCommand()) {
        await this.commandHandler.handleCommand(interaction as CommandInteraction);
      }
    });
  }

  /**
   * Handles the 'ready' event of the Bot. Updates presence and registers commands.
   * @return {Promise<void>}
   */
  async onReady(): Promise<void> {
    console.log(`Logged in as ${this.client.user!.tag}`);
    this.updateBotPresence();
    setInterval(this.updateBotPresence.bind(this), 30000); // Update bot presence every 30 seconds
    try {
      await this.commandHandler.registerCommands(this.client);
      console.log('Slash commands registered successfully!');
    } catch (error) {
      console.error('Failed to register slash commands:', error);
    }
    
    // Store Fear & Greed Index every 24 hours
    // setInterval(async () => {
    //   try {
    //     const fearGreedIndex = await this.api.getFearGreedIndex();
    //     await this.database.storeFearGreedIndex(fearGreedIndex);
    //     console.log('Fear & Greed Index stored successfully');
    //   } catch (err) {
    //     console.error('Failed to store Fear & Greed Index:', err);
    //   }
    // }, 86400000); // 24 hours in milliseconds
  }

  /**
   * Handles the 'interactionCreate' event of the Bot, if the interaction is a command.
   * @param {Interaction} interaction - The Interaction instance.
   * @return {Promise<void>}
   */
  async onInteractionCreate(interaction: Interaction): Promise<void> {
    if (!interaction.isCommand()) return;
    await this.commandHandler.handleCommand(interaction as CommandInteraction);
  }

  /**
   * Logs in the Bot using the token from environment variables.
   * @return {void}
   */
  login(): void {
    this.client.login(process.env.BOT_TOKEN);
  }

  /**
   * Updates the Bot's presence with the latest Fear & Greed Index.
   * @return {Promise<void>}
   */
  async updateBotPresence(): Promise<void> {
    try {
      const fearGreedIndex = await this.api.getFearGreedIndex();
      this.client.user!.setPresence({
        activities: [{ name: `F&G Index: ${fearGreedIndex}`, type: ActivityType.Watching }]
      });
    } catch (error) {
      console.error('Failed to update bot presence:', error);
    }
  }
}

// Create a new Bot instance and login
new Bot().login();
