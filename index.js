const {Client, REST, Routes, SlashCommandBuilder} = require("discord.js");
const client = new Client({intents: []});
const config = require('./config.json');
const ignored = require('fs');
const rest = new REST({version: '10'}).setToken(config.token);

const commands = [
    new SlashCommandBuilder()
        .setName('github')
        .setDescription('Get Github profile details')
        .addStringOption(option => option.setName('github_username').setDescription('Enter Github username').setRequired(true)),
];

async function registerCommands() {
    try {
        console.log('Started refreshing application!');
        await rest.put(Routes.applicationGuildCommands(config.guildId, config.applicationId), {body: commands});
        console.log('Successfully reloaded application!');
    } catch (error) {
        console.error(error);
    }
}

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    if (interaction.isChatInputCommand()) {
        if (interaction.commandName === 'github') {
            await handleGitHubCommand(interaction);
        }
    }
});

async function handleGitHubCommand(interaction) {
    const https = require('https');
    const username = interaction.options.getString('github_username');
    const link = "https://api.github.com/users/" + username;
    const options = {
        headers: {
            'User-Agent': 'My Discord Bot'
        }
    };

    https.get(link, options, async (response) => {
        let data = '';

        await response.on('data', (chunk) => {
            data += chunk;
        });

        if (response.statusCode === 404) {
            await interaction.reply({content: 'User not found!', ephemeral: true});
            return;
        }

        await response.on('end', async () => {
            const githubJson = JSON.parse(data);
            const randomColor = Math.floor(Math.random() * 16777215);

            const description = [
                githubJson.name && `**Name**: ${githubJson.name}`,
                githubJson.bio && `**Bio**: ${githubJson.bio}`,
                githubJson.company && `**Company**: ${githubJson.company}`,
                githubJson.location && `**Location**: ${githubJson.location}`,
                `**Followers**: ${githubJson.followers || 0}`,
                `**Following**: ${githubJson.following || 0}`,
                `**Public Repos**: ${githubJson.public_repos || 0}`,
                githubJson.blog && `**Website**: ${githubJson.blog}`,
                githubJson.twitter_username && `**Twitter**: @${githubJson.twitter_username}`
            ].filter(Boolean).join('\n');

            const embed = {
                "title": "Github Profile Details",
                "description": description,
                "color": randomColor,
                "image": {
                    "url": githubJson.avatar_url
                },
                "fields": [
                    {
                        "name": "GitHub Profile Link",
                        "value": `[Go to GitHub Profile](${githubJson.html_url})`
                    }
                ]
            };
            await interaction.reply({embeds: [embed], ephemeral: true});
        });
    }).on('error', (error) => {
        console.error(error);
    });
}

client.on('ready', async () => {
    console.log('Bot is ready!');
    await registerCommands();
});

client.login(config.token).then(() => console.log('Bot is logged in!'));