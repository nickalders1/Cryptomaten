const { Client, Collection } = require("discord.js");
const client = new Client({ intents:  32767});
const { token } = require("./config.json");
client.commands = new Collection();

require("./handlers/events")(client);
require("./handlers/Commands")(client);

client.once("ready", () => { 
  console.log("I am online!")
  client.user.setActivity("Cryptomaten!", {type: "WATCHING"});
  }); 

  require("./handlers/commands")(client);

  client.login(token);