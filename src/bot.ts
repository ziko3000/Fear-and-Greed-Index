import { Client, ActivityType, Interaction } from 'discord.js';
// import discordjs from 'discord.js';
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
    
    let fearGreedIndex = await this.api.getFearGreedIndex();
    this.client.user!.setPresence({ activities: [{ name: `Fear and Greed Index: ${fearGreedIndex}`, type: ActivityType.Watching}] });
    
    try {
      await this.commandHandler.registerCommands(this.client);
      console.log('Slash commands registered successfully!');
    } catch (error) {
      console.error('Failed to register slash commands:', error);
    }
  }

  async onInteractionCreate(interaction: Interaction) : Promise<void> {
    if (!interaction.isCommand()) return;
    await this.commandHandler.handleCommand(interaction);
  }

  login() : void {
    this.client.login(process.env.BOT_TOKEN);
  }
}

const bot = new Bot();
bot.login();
