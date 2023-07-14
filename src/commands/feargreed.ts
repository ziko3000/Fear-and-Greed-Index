import { CommandInteraction, EmbedBuilder } from 'discord.js';
import { FearGreedIndexAPI } from '../api';

export class FearGreedCommand {
  api: FearGreedIndexAPI;

  constructor() {
    this.api = new FearGreedIndexAPI();
  }

  async execute(interaction: CommandInteraction): Promise<void> {
    try {
      const fearGreedIndex = await FearGreedIndexAPI.getFearGreedIndex();
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
