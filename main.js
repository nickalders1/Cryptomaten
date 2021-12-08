
const { Client, Collection } = require("discord.js");
const client = new Client({ intents:  32767});
<<<<<<< HEAD
const { token } = require("./config.json");
=======
const { token } = require("./token.json");
>>>>>>> parent of 3c06c58 (added event handler)

client.commands = new Collection();

<<<<<<< HEAD
require("./handlers/events")(client);
require("./handlers/Commands")(client);
=======
client.once("ready", () => { 
  console.log("I am online!")
  client.user.setActivity("Cryptomaten!", {type: "WATCHING"});
  }); 

  require("./handlers/commands")(client);


>>>>>>> parent of 3c06c58 (added event handler)



  client.login(token);