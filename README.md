<h1 align="center">Fear and Greed Index Discord Bot 🤖</h1>

<div align="center">
  <sub>Built with ❤︎ by
  <a href="https://github.com/yourusername">Your Name</a> and
  <a href="https://github.com/yourusername/Fear-and-Greed-Index-Discord-Bot/graphs/contributors">
    contributors
  </a>
  </sub>
</div>

<p align="center">
A Discord bot that allows you to get the current Fear and Greed Index for cryptocurrency markets using Slash commands.
</p>

![Bot Demo](demo.gif)

## 📝 Table of Contents

- [Getting Started](#getting_started)
- [Usage](#usage)
- [Adding Commands](#adding_commands)
- [Contributing](#contributing)
- [License](#license)

## 🏁 Getting Started <a name = "getting_started"></a>

### Prerequisites

To run this project, you'll need to have:

- Node.js (version 14.0.0 or newer)
- A Discord bot token, which you can get by creating a bot on the [Discord Developer Portal](https://discord.com/developers/applications)
- An environment variable file (.env) for your bot token

### Installing

1. Clone this repository:

    ```bash
    git clone https://github.com/yourusername/your-repo-name.git
    ```

2. Change into the cloned repository:

    ```bash
    cd your-repo-name
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

4. Create an .env file in the root of your project and insert your bot token:

    ```env
    BOT_TOKEN=YourDiscordBotToken
    APPLICATION_ID=YourApplicationId
    ```

5. Run the bot:

    ```bash
    npm run start
    ```

## 🎈 Usage <a name = "usage"></a>

This bot supports the following Slash commands:

- `/hello`: Say hello to the bot.
- `/ping`: Check the bot's latency.
- `/feargreed`: Get the current Fear and Greed Index.
- `/help`: Get help about the bot and its commands.

## ⛏️ Adding Commands <a name = "adding_commands"></a>

To add a new command:

1. Create a new command file in the `commands` folder, like `mycommand.ts`.
2. Define your command as a class with `name`, `description`, and `execute` method.
3. Import your command class in `CommandHandler.ts` and register it in the constructor.

For example:

```typescript
import { MyCommand } from './mycommand';

// In CommandHandler constructor
this.registerCommand('mycommand', 'This is my command', (interaction) => new MyCommand().execute(interaction));
