import { Client, ActivityType, Interaction, CommandInteraction } from 'discord.js';
import { FearGreedIndexAPI } from './api';
import { config as dotenvConfig } from  'dotenv';
import { CommandHandler } from './commands';

dotenvConfig();

class Bot {
  client: Client;
  api: FearGreedIndexAPI;
  commandHandler: CommandHandler;

  constructor() {
    this.client = new Client({
      intents: 8
    });

    this.commandHandler = new CommandHandler();
    this.api = new FearGreedIndexAPI();

    this.client.on('ready', this.onReady.bind(this));
    this.client.on('interactionCreate', this.onInteractionCreate.bind(this));
  }

  async onReady(): Promise<void>{
    console.log(`Logged in as ${this.client.user!.tag}`);
    // Call this immediately once when the bot starts
    this.updateBotPresence();
    // Then call this every 5 minutes
    setInterval(this.updateBotPresence.bind(this), 300000)
    
    try {
      await this.commandHandler.registerCommands(this.client);
      console.log('Slash commands registered successfully!');
    } catch (error) {
      console.error('Failed to register slash commands:', error);
    }
  }
  

  async onInteractionCreate(interaction: Interaction) : Promise<void> {
    if (!interaction.isCommand()) return;
    await this.commandHandler.handleCommand(interaction as CommandInteraction);
  }

  login() : void {
    this.client.login(process.env.BOT_TOKEN);
  }

  async updateBotPresence(): Promise<void> {
    try {
      let fearGreedIndex = await this.api.getFearGreedIndex();
      this.client.user!.setPresence({ activities: [{ name: `F&G Index: ${fearGreedIndex}`, type: ActivityType.Watching}] });
    } catch (error) {
      console.error('Failed to update bot presence:', error);
    }
  }
}


const bot = new Bot();
bot.login();
