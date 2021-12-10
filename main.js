const { guildId } = require("./config.json");
const { clientId } = require("./config.json");
const { Client, Collection, Intents } = require("discord.js");
const client = new Client({intents: [Intents.FLAGS.GUILDS] });
const { token } = require("./config.json");
client.commands = new Collection();

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');


const commands = [{
	name: 'ping',
	description: 'Replies with Pong!'
  }, {
	name: 'server',
	description: 'Replies with server info'
  }, {
	name: 'user',
	description: 'Replies with user info'
}];

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands },
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();


// for event handler
require("./Handlers/events")(client);
//-------------------------------------------------------------------------------------------------------------

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