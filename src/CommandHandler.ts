import { Client, SlashCommandBuilder, REST, Routes, CommandInteraction } from 'discordjs';
import { Index } from './commands/index.ts';
import { logger } from '../deps.ts';
// import { Greed } from './commands/greed';
// import { HelpCommand } from './commands/help';

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
      try {
        this.commands = new Map<string, BotCommand>();

        this.registerCommand('index', 'Get the current Fear and Greed Index', (interaction) => new Index().execute(interaction));
        // this.registerCommand('feargreed', 'Get the current Fear and Greed Index', (interaction) => new Greed().execute(interaction));
        // this.registerCommand('help', 'Get help about the bot and its commands', (interaction) => new HelpCommand().execute(interaction));
      } catch (error) {
        console.error(error);
      }
    }

    /**
     * Registers a command to the Bot.
     * @param {string} name - The name of the command.
     * @param {string} description - The description of the command.
     * @param {(interaction: CommandInteraction) => Promise<void>} execute - The function to execute when the command is called.
     * @return {void}
     */
    registerCommand(name: string, description: string, execute: (interaction: CommandInteraction) => Promise<void>) {
      logger.info(`Registering command: ${name}`);
      try {
        this.commands.set(name, { name, description, execute });
      } catch (error) {
        console.error(error);
      }
    }

    /**
     * Registers all commands to Discord.
     * @param {Client} client - The Discord.js client instance.
     * @return {Promise<void>}
     */
    async registerCommandsToDiscord(client: Client): Promise<void> {
      logger.info('Registering commands to Discord globally');
      try {
        const commandBuilders = Array.from(this.commands.values()).map(
          ({ name, description }) => new SlashCommandBuilder().setName(name).setDescription(description).toJSON()
        );

        const rest = new REST({ version: '10' }).setToken(Deno.env.get('BOT_TOKEN')!);
        await rest.put(
          Routes.applicationCommands(Deno.env.get('APPLICATION_ID')!),
          { body: commandBuilders }
        );
      } catch (error) {
        console.error(error);
      }
    }

    /**
     * Handles a command interaction.
     * @param {CommandInteraction} interaction - The command interaction instance.
     * @return {Promise<void>}
     */
    async handleCommand(interaction: CommandInteraction): Promise<void> {
      try {
        const command = this.commands.get(interaction.commandName);
        logger.info(`Handling command: ${interaction.commandName}`);
        await command!.execute(interaction);
      } catch (error) {
        console.error(`Command not found: ${interaction.commandName}`);
      }
    }
  }
