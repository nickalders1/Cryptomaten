const { Client, Collection } = require("discord.js");
const client = new Client({ intents:  32767});
const { token } = require("./config.json");
client.commands = new Collection();
const { prefix } = require("./config.json");

require("./Handlers/events")(client);
require("./Handlers/Commands")(client);
require("./Handlers/Commands")(client);

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
	} else if (commandName === 'user') {
		await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
	}
});


  client.login(token);