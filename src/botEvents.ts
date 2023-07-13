import { Client, ActivityType, Interaction, CommandInteraction } from 'discord.js';
import { FearGreedIndexAPI } from './api';
import { CommandHandler } from './commands/CommandHandler';
import { Database } from './database';

/**
 * Class handling bot events.
 * @constructor
 * @param {Client} client - The Discord.js Client instance.
 * @param {FearGreedIndexAPI} api - The Fear and Greed Index API instance.
 * @param {CommandHandler} commandHandler - The Command Handler instance.
 * @param {Database} database - The Database instance.
 */
export class BotEvents {
  client: Client;
  api: FearGreedIndexAPI;
  commandHandler: CommandHandler;
  database: Database;

  constructor(client: Client, api: FearGreedIndexAPI, commandHandler: CommandHandler, database: Database) {
    this.client = client;
    this.api = api;
    this.commandHandler = commandHandler;
    this.database = database;

    // Set up bot event listeners
    this.client.on('ready', () => this.onReady());
    this.client.on('interactionCreate', async (interaction: Interaction) => {
      if (interaction.isCommand()) {
        await this.commandHandler.handleCommand(interaction as CommandInteraction);
      }
    });
  }

  /**
   * Handles the 'ready' event of the bot. Updates bot presence, registers commands and schedules 
   * Fear & Greed Index data storing.
   * @return {Promise<void>}
   */
  async onReady(): Promise<void> {
    console.log(`Logged in as ${this.client.user!.tag}`);

    // Update bot presence and set up a periodic update every 30 seconds
    this.updateBotPresence();
    setInterval(this.updateBotPresence.bind(this), 30000);

    // Register the slash commands to Discord
    try {
      await this.commandHandler.registerCommandsToDiscord(this.client);
      console.log('Slash commands registered successfully!');
    } catch (error) {
      console.error('Failed to register slash commands:', error);
    }
    
    // Schedule the Fear & Greed Index data storing to run every 24 hours
    setInterval(async () => {
      try {
        const fearGreedIndex = await this.api.getFearGreedIndex();
        await this.database.storeFearGreedIndex(fearGreedIndex);
        console.log('Fear & Greed Index stored successfully');
      } catch (err) {
        console.error('Failed to store Fear & Greed Index:', err);
      }
    }, 86400000);
  }

  /**
   * Updates the bot's presence with the latest Fear & Greed Index.
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
