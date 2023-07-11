import pkg from 'discord.js';
const { Client, Intents, ActivityType } = pkg;
import { FearGreedIndexAPI } from './api.js';
import 'dotenv/config';
import { CommandHandler } from './commands.js';

class Bot {
  constructor() {
    this.client = new Client({
      intents: 8
    });

    this.commandHandler = new CommandHandler();
    this.api = new FearGreedIndexAPI();

    this.client.on('ready', this.onReady.bind(this));
    this.client.on('interactionCreate', this.onInteractionCreate.bind(this));
  }

  async onReady() {
    console.log(`Logged in as ${this.client.user.tag}`);
    
    let fearGreedIndex = await this.api.getFearGreedIndex();
    this.client.user.setPresence({ activities: [{ name: `Fear and Greed Index: ${fearGreedIndex}`, type: ActivityType.Watching}] });
    
    try {
      await this.commandHandler.registerCommands(this.client);
      console.log('Slash commands registered successfully!');
    } catch (error) {
      console.error('Failed to register slash commands:', error);
    }
  }

  async onInteractionCreate(interaction) {
    if (!interaction.isCommand()) return;
    await this.commandHandler.handleCommand(interaction);
  }

  login() {
    this.client.login(process.env.BOT_TOKEN);
  }
}

const bot = new Bot();
bot.login();
