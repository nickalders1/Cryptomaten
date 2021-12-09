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



require("./Handlers/events")(client);

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
  
	if (interaction.commandName === 'ping') {
	  await interaction.reply('Pong!');
	}
  });

  client.login(token);