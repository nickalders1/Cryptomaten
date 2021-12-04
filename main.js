const { client, Client } = require("discord.js");
const client = new Client({intentse: 32767});

client.once("ready", () => { 
  console.log("I am online!")
  });

  client.loging("./token.json");