import { CommandInteraction } from 'discord.js';

export class HelloCommand {
  async execute(interaction: CommandInteraction): Promise<void> {
    await interaction.reply({
      content: 'Hello',
      components: []
    });
  }
}
