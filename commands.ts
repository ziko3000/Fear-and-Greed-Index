import { Client, SlashCommandBuilder, REST, Routes, EmbedBuilder, Interaction, CommandInteraction } from 'discord.js';
import { FearGreedIndexAPI} from './api';

/**
 * Class to handle bot commands.
 */
export class CommandHandler {
  api: FearGreedIndexAPI;

  /**
   * Constructs a new CommandHandler instance.
   */
  constructor() {
    this.api = new FearGreedIndexAPI();
  }

  /**
   * Registers commands for the bot.
   * @param {Client} client - The Client instance.
   * @return {Promise<void>}
   */
  async registerCommands(client: Client): Promise<void> {
    const commands = [
      new SlashCommandBuilder().setName('hello').setDescription('Say hello').toJSON(),
      new SlashCommandBuilder().setName('ping').setDescription('Ping the bot').toJSON(),
      new SlashCommandBuilder().setName('feargreed').setDescription('Get the current Fear and Greed Index').toJSON(),
    ];

    const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN!);
    await rest.put(
      Routes.applicationCommands(process.env.APPLICATION_ID!),
      { body: commands }
    );
  }

  /**
   * Handles command interactions for the bot.
   * @param {CommandInteraction} interaction - The Interaction instance.
   * @return {Promise<void>}
   */
  async handleCommand(interaction: CommandInteraction): Promise<void> {
    const commandName = interaction.commandName;
    
    if (commandName === 'hello') {
      await interaction.reply('Hello!');
    } else if (commandName === 'ping') {
      await interaction.reply('Pong!');
    } else if (commandName === 'feargreed') {
      try {
        const fearGreedIndex = await this.api.getFearGreedIndex();
        const embed = new EmbedBuilder()
          .setTitle('Fear and Greed Index')
          .setDescription(`The current Fear and Greed Index is ${fearGreedIndex}`)
          .setImage('https://alternative.me/crypto/fear-and-greed-index.png');

        await interaction.reply({ embeds: [embed] });
      } catch (error) {
        console.error('Failed to fetch Fear and Greed Index:', error);
        await interaction.followUp('Failed to fetch Fear and Greed Index.');
      }
    }
  }
}
