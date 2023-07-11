const { Client, Intents, SlashCommandBuilder, EmbedBuilder, REST, Routes, ActivityType } = require('discord.js');

const axios = require('axios');
require('dotenv').config();

// Create a new client instance
const client = new Client({
  intents: 8
});
let fearGreedIndex;

async function getFearGreedIndex() {
  const response = await axios.get('https://api.alternative.me/fng/');
  fearGreedIndex = response.data.data[0].value;
  
  return fearGreedIndex;
}

// Event handler for when the bot is ready
client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}`);
  await getFearGreedIndex();
  client.user.setPresence({ activities: [{ name: `Fear and Greed Index: ${fearGreedIndex}`, type: ActivityType.Watching}] });
  


  try {
    const applicationId = process.env.APPLICATION_ID;
    
    await getFearGreedIndex();
    console.log(await getFearGreedIndex());
  
    
    const commands = [
      new SlashCommandBuilder()
        .setName('hello')
        .setDescription('Say hello')
        .toJSON(),
      new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Ping the bot')
        .toJSON(),
      new SlashCommandBuilder()
        .setName('feargreed')
        .setDescription('Get the current Fear and Greed Index')
        .toJSON()
    ];

    // Register slash commands globally
    const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);
    await rest.put(
      Routes.applicationCommands(applicationId),
      { body: commands }
    );

    console.log('Slash commands registered successfully!');
  } catch (error) {
    console.error('Failed to register slash commands:', error);
  }
});

// Event handler for interactions (e.g., slash commands)
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'hello') {
    // Reply with "Hello!" for the hello command
    await interaction.reply('Hello!');
  } else if (commandName === 'ping') {
    // Reply with "Pong!" for the ping command
    await interaction.reply('Pong!');
  } else if (commandName === 'feargreed') {
    try {
      // Fetch the current Fear and Greed Index from the API
      const fearGreedIndex = await getFearGreedIndex();
      const embed = new EmbedBuilder()
        .setTitle('Fear and Greed Index')
        .setDescription(`The current Fear and Greed Index is ${fearGreedIndex}`)
        .setImage('https://alternative.me/crypto/fear-and-greed-index.png'); // Replace with the URL of your image

      // Reply with the embed message
      await interaction.reply({ embeds: [embed] });
      // Reply with the current Fear and Greed Index
      await interaction.followUp(`The current Fear and Greed Index is ${fearGreedIndex}`);
    } catch (error) {
      console.error('Failed to fetch Fear and Greed Index:', error);
      await interaction.followUp('Failed to fetch Fear and Greed Index.');
    }
  }
});

// Log in to the Discord gateway using the bot token
client.login(process.env.BOT_TOKEN);
