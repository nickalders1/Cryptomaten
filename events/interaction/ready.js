const { Client } = require("discord.js")

module.exports ={
    name: "ready",
    once: true,
/**
 * @param {Client} client
 */

    execute(client){
        console.log("I'm online!")
        client.user.setActivity("Cryptomaten", {type: "WATCHING"});

    }
}