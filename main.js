
const { Client, Collection } = require("discord.js");
const client = new Client({ intents:  32767});
<<<<<<< HEAD
const { token } = require("./config.json");
=======
const { token } = require("./token.json");
<<<<<<< HEAD
>>>>>>> parent of 3c06c58 (added event handler)
=======
>>>>>>> parent of 3c06c58 (added event handler)

client.commands = new Collection();

<<<<<<< HEAD
<<<<<<< HEAD
require("./handlers/events")(client);
require("./handlers/Commands")(client);
=======
=======
>>>>>>> parent of 3c06c58 (added event handler)
client.once("ready", () => { 
  console.log("I am online!")
  client.user.setActivity("Cryptomaten!", {type: "WATCHING"});
  }); 

  require("./handlers/commands")(client);


<<<<<<< HEAD
>>>>>>> parent of 3c06c58 (added event handler)
=======
>>>>>>> parent of 3c06c58 (added event handler)



  client.login(token);