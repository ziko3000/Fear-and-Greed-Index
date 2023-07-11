"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandler = void 0;
var discord_js_1 = require("discord.js");
var api_js_1 = require("./api.js");
var CommandHandler = /** @class */ (function () {
    function CommandHandler() {
        this.api = new api_js_1.FearGreedIndexAPI();
    }
    return CommandHandler;
}());
exports.CommandHandler = CommandHandler;
void  > {
    const: commands = [
        new discord_js_1.SlashCommandBuilder()
            .setName('hello')
            .setDescription('Say hello')
            .toJSON(),
        new discord_js_1.SlashCommandBuilder()
            .setName('ping')
            .setDescription('Ping the bot')
            .toJSON(),
        new discord_js_1.SlashCommandBuilder()
            .setName('feargreed')
            .setDescription('Get the current Fear and Greed Index')
            .toJSON()
    ],
    const: rest = new discord_js_1.REST({ version: '10' }).setToken(process.env.BOT_TOKEN),
    await: await,
    rest: rest,
    : .put(discord_js_1.Routes.applicationCommands(process.env.APPLICATION_ID), { body: commands })
};
async;
handleCommand(interaction, Interaction);
Promise < void  > {
    const: commandName = interaction.commandName,
    if: function (commandName) { }
} === 'hello';
{
    await interaction.reply('Hello!');
}
if (commandName === 'ping') {
    await interaction.reply('Pong!');
}
else if (commandName === 'feargreed') {
    try {
        var fearGreedIndex = await this.api.getFearGreedIndex();
        var embed = new discord_js_1.EmbedBuilder()
            .setTitle('Fear and Greed Index')
            .setDescription("The current Fear and Greed Index is ".concat(fearGreedIndex))
            .setImage('https://alternative.me/crypto/fear-and-greed-index.png');
        await interaction.reply({ embeds: [embed] });
    }
    catch (error) {
        console.error('Failed to fetch Fear and Greed Index:', error);
        await interaction.followUp('Failed to fetch Fear and Greed Index.');
    }
}
