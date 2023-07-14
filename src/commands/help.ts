import { CommandInteraction, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } from 'discord.js';

/**
 * HelpCommand class for providing help about the bot and its commands.
 */
export class HelpCommand {
  /**
   * Execute the help command.
   * @param {CommandInteraction} interaction - The interaction instance.
   * @throws {Error} When unable to reply to the interaction.
   * @returns {Promise<void>} Nothing.
   */
  async execute(interaction: CommandInteraction): Promise<void> {
    try {
      const helpEmbed = new EmbedBuilder()
        .setTitle('Bot Help')
        .setDescription('This bot provides information about the Fear and Greed Index. You can interact with the bot using the following commands:')
        .setColor('#0099ff')
        .addFields(
          { name: '/hello', value: '** - Say hello**' },
          { name: '/ping', value: '** - Ping the bot**' },
          { name: '/feargreed', value: '** - Get the current Fear and Greed Index**' },
          { name: '/help', value: '** - Get help about the bot and its commands**' }
        );

        const supportButton = new ButtonBuilder()
        .setLabel('Support')
        .setURL('https://discord.js.org')
        .setStyle(ButtonStyle.Link)
        const row = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(supportButton);

      await interaction.reply({ embeds: [helpEmbed], components: [row] });
    } catch (error) {
      const message = (error instanceof Error) ? error.message : 'Unexpected error occurred';
      throw new Error(`Failed to reply to the interaction: ${message}`);
    }
  }
}
