const { guildId } = require("./config.json");
const { clientId } = require("./config.json");
const { Client, Collection, Intents } = require("discord.js");
const client = new Client({ intents: 32767 });
const { token } = require("./config.json");

client.commands = new Collection();

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');


const commands = [];

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


// For command handler
client.commands = new Collection()
require("./Handlers/Commands")(client);
//-------------------------------------------------------------------------------------------------------------

// For event handler
require("./Handlers/events")(client);
//-------------------------------------------------------------------------------------------------------------


client.login(token).then(() => {
  console.log(`Client logged in as ` + client.user.tag)
}).catch((err) => {
  console.log(err)
});

module.exports = {
  client
}