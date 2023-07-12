import { Client, ActivityType, Interaction, CommandInteraction } from 'discord.js';
import { FearGreedIndexAPI } from './api';
import { config as dotenvConfig } from  'dotenv';
import { CommandHandler } from './commands';

// Load environment variables
dotenvConfig();

/**
 * Class representing the Discord Bot
 */
class Bot {
  // Initialize class properties
  client: Client = new Client({ intents: 8 });
  api: FearGreedIndexAPI = new FearGreedIndexAPI;
  commandHandler: CommandHandler = new CommandHandler;

  /**
   * Constructs a new Bot instance and sets up event listeners.
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
    setInterval(this.updateBotPresence.bind(this), 300000); // Update bot presence every 5 minutes
    try {
      await this.commandHandler.registerCommands(this.client);
      console.log('Slash commands registered successfully!');
    } catch (error) {
      console.error('Failed to register slash commands:', error);
    }
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
   * Logins the Bot using the token from environment variables.
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
