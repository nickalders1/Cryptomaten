const { Client, Collection, Intents } = require("discord.js");
const client = new Client({intents: [Intents.FLAGS.GUILDS] });
const { token } = require("./config.json");
client.commands = new Collection();
const { prefix } = require("./config.json");



require("./Handlers/events")(client);



  client.login(token);