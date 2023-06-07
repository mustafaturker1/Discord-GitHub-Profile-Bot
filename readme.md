# Discord GitHub Profile Bot

This Discord bot allows you to retrieve GitHub profile details right within your Discord server. You can easily fetch information about any GitHub user and display it as an embed message.

## Features

- Get detailed information about a GitHub user's profile
- Display the user's name, bio, company, location, follower count, following count, public repository count, website (if available), and Twitter handle (if available)
- Show the user's profile picture and provide a direct link to their GitHub profile

## Usage

1. Invite the bot to your Discord server.
2. Use the `/github` command followed by the GitHub username to retrieve the profile details.
3. The bot will fetch the information from the GitHub API and display it as an embed message in the channel.

## Installation

To use this bot, follow these steps:

1. Clone this repository: `https://github.com/mustafamikaelson/Discord-GitHub-Profile-Bot.git`
2. Install the dependencies: `npm install`
3. Set up your Discord bot and obtain a token. Update the `config.json` file with your token and other configurations.
4. Start the bot: `node index.js`
5. Customize and modify the bot according to your needs.

## Dependencies

This bot is built using the following dependencies:

- discord.js: A powerful JavaScript library for interacting with the Discord API.
- axios: A promise-based HTTP client for making requests to the GitHub API.

## Contributing

Contributions are welcome! If you have any suggestions, improvements, or bug fixes, feel free to open an issue or submit a pull request.