#Fear and Greed Index Discord Bot
This is a Discord bot that allows you to get the current Fear and Greed Index for cryptocurrency markets. It uses Slash commands in Discord, which allows you to interact with the bot directly from the text chat.

📝 Table of Contents
Getting Started
Usage
Adding Commands
Contributing
License
🏁 Getting Started <a name = "getting_started"></a>
Prerequisites
To run this project, you'll need to have:

Node.js (version 14.0.0 or newer)
A Discord bot token, which you can get by creating a bot on the Discord Developer Portal
An environment variable file (.env) for your bot token
Installing
Clone this repository:

bash
Copy code
git clone https://github.com/ziko3000/Fear-and-Greed-Index
Change into the cloned repository:

bash
Copy code
cd your-repo-name
Install the dependencies:

bash
Copy code
npm install
Create an .env file in the root of your project and insert your bot token:

env
Copy code
BOT_TOKEN=YourDiscordBotToken
APPLICATION_ID=YourApplicationId
Run the bot:

bash
Copy code
npm run start
🎈 Usage <a name = "usage"></a>
This bot supports the following Slash commands:

/hello: Say hello to the bot.
/ping: Check the bot's latency.
/feargreed: Get the current Fear and Greed Index.
/help: Get help about the bot and its commands.
⛏️ Adding Commands <a name = "adding_commands"></a>
To add a new command:

Create a new command file in the commands folder, like mycommand.ts.
Define your command as a class with name, description, and execute method.
Import your command class in CommandHandler.ts and register it in the constructor.
For example:

typescript
Copy code
import { MyCommand } from './mycommand';

// In CommandHandler constructor
this.registerCommand('mycommand', 'This is my command', (interaction) => new MyCommand().execute(interaction));
Save to grepper
⛏️ Contributing <a name = "contributing"></a>
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

📄 License <a name = "license"></a>
This project is licensed under the MIT License - see the LICENSE.md file for details.
