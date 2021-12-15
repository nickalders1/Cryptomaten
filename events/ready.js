const { Client } = require("discord.js")

module.exports ={
    name: "ready",
    once: true,
/**
 * @param {Client} client
 */

    execute(client){
        console.log(`I'm online as: ${client.user.tag}!`)
        client.user.setActivity("Cryptomaten", {type: "WATCHING"});

    }
}