import { CommandInteraction, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } from 'discord.js';

export class HelpCommand {
  async execute(interaction: CommandInteraction): Promise<void> {
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
      .setStyle(ButtonStyle.Link);
    
    const row = new ActionRowBuilder<ButtonBuilder>()
      .addComponents(supportButton);

    await interaction.reply({ embeds: [helpEmbed], components: [row] });
  }
}
