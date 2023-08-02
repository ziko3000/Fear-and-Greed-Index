import { CommandInteraction, EmbedBuilder } from 'npm:discord.js';
import { FearGreedIndexAPI } from '../api.ts';

export class Index {

  async execute(interaction: CommandInteraction): Promise<void> {
    let deferSucceeded = false;
    try {
      await interaction.deferReply();
      deferSucceeded = true; // set this to true after deferring reply

      const fearGreedIndex = await FearGreedIndexAPI.getFearGreedIndex();
      const embed = new EmbedBuilder()
        .setTitle('Fear and Greed Index')
        .setColor('#0099ff')
        .setDescription(`The current Fear and Greed Index is ${fearGreedIndex}`)
        .setImage('https://alternative.me/crypto/fear-and-greed-index.png');

      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.error('Failed to fetch Fear and Greed Index:', error);
      if (deferSucceeded) {
        // If the interaction was deferred successfully, edit the deferred reply.
        await interaction.editReply({ content: 'Failed to fetch Fear and Greed Index.'});
      } else {
        // If the interaction was not deferred, reply directly.
        await interaction.reply({ content: 'Failed to fetch Fear and Greed Index.', ephemeral: true });
      }
    }
  }
}

