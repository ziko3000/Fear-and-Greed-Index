import { CommandInteraction } from 'discord.js';

export class PingCommand {
  async execute(interaction: CommandInteraction): Promise<void> {
    await interaction.reply('Pong!');
  }
}
