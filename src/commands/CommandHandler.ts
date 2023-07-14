  import { Client, SlashCommandBuilder, REST, Routes, CommandInteraction } from 'discord.js';
  import { HelloCommand } from './hello';
  import { PingCommand } from './ping';
  import { FearGreedCommand } from './feargreed';
  import { HelpCommand } from './help';

  /**
   * Interface for the Bot commands.
   */
  interface BotCommand {
    name: string;
    description: string;
    execute: (interaction: CommandInteraction) => Promise<void>;
  }

  /**
   * Represents a command handler for a Discord Bot.
   * @constructor
   */
  export class CommandHandler {
    /**
     * Map of Bot commands.
     * @type {Map<string, BotCommand>}
     */
    commands: Map<string, BotCommand>;

    /**
     * @constructs CommandHandler instance and registers the commands.
     */
    constructor() {
      this.commands = new Map<string, BotCommand>();

      this.registerCommand('hello', 'Say hello', new HelloCommand().execute);
      this.registerCommand('ping', 'Ping the bot', new PingCommand().execute);
      this.registerCommand('feargreed', 'Get the current Fear and Greed Index', new FearGreedCommand().execute);
      this.registerCommand('help', 'Get help about the bot and its commands', new HelpCommand().execute);
    }

    /**
     * Registers a command to the Bot.
     * @param {string} name - The name of the command.
     * @param {string} description - The description of the command.
     * @param {(interaction: CommandInteraction) => Promise<void>} execute - The function to execute when the command is called.
     * @return {void}
     */
    registerCommand(name: string, description: string, execute: (interaction: CommandInteraction) => Promise<void>) {
      this.commands.set(name, { name, description, execute });
    }

    /**
     * Registers all commands to Discord.
     * @param {Client} client - The Discord.js client instance.
     * @return {Promise<void>}
     */
    async registerCommandsToDiscord(client: Client): Promise<void> {
      const commandBuilders = Array.from(this.commands.values()).map(
        ({ name, description }) => new SlashCommandBuilder().setName(name).setDescription(description).toJSON()
      );

      const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN!);
      await rest.put(
        Routes.applicationCommands(process.env.APPLICATION_ID!),
        { body: commandBuilders }
      );
    }

    /**
     * Handles a command interaction.
     * @param {CommandInteraction} interaction - The command interaction instance.
     * @return {Promise<void>}
     */
    async handleCommand(interaction: CommandInteraction): Promise<void> {
      const command = this.commands.get(interaction.commandName);
      if (command) {
        await command.execute(interaction);
      } else {
        console.error(`Command not found: ${interaction.commandName}`);
      }
    }
  }
