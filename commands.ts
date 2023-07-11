import { Client, SlashCommandBuilder, CommandInteraction, REST, Routes, EmbedBuilder, Interaction } from 'discord.js';
import { FearGreedIndexAPI} from './api';

export class CommandHandler {
  api: FearGreedIndexAPI;
  
  constructor() {
    this.api = new FearGreedIndexAPI();
  }

  async registerCommands(client: Client): Promise<void> {
    const commands = [
      new SlashCommandBuilder()
        .setName('hello')
        .setDescription('Say hello')
        .toJSON(),
      new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Ping the bot')
        .toJSON(),
      new SlashCommandBuilder()
        .setName('feargreed')
        .setDescription('Get the current Fear and Greed Index')
        .toJSON()
    ];

    const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN!);
    await rest.put(
      Routes.applicationCommands(process.env.APPLICATION_ID!),
      { body: commands }
    );
  }

  async handleCommand(interaction: Interaction): Promise<void> {
    const commandInteraction = interaction as CommandInteraction;
    const commandName = commandInteraction.commandName;
    
    if (commandName === 'hello') {
      await commandInteraction.reply('Hello!');
    } else if (commandName === 'ping') {
      await commandInteraction.reply('Pong!');
    } else if (commandName === 'feargreed') {
      try {
        const fearGreedIndex = await this.api.getFearGreedIndex();
        const embed = new EmbedBuilder()
          .setTitle('Fear and Greed Index')
          .setDescription(`The current Fear and Greed Index is ${fearGreedIndex}`)
          .setImage('https://alternative.me/crypto/fear-and-greed-index.png');

        await commandInteraction.reply({ embeds: [embed] });
      } catch (error) {
        console.error('Failed to fetch Fear and Greed Index:', error);
        await commandInteraction.followUp('Failed to fetch Fear and Greed Index.');
      }
    }
  }
}


