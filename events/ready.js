const { Client } = require("discord.js")
const mongoose = require("mongoose");
const { Database } = require("../config.json");

module.exports ={
    name: "ready",
    once: true,
/**
 * @param {Client} client
 */

    execute(client){
        console.log(`I'm online as: ${client.user.tag}!`)
        client.user.setActivity("Cryptomaten", {type: "WATCHING"});

        if(!Database) return;
        mongoose.connect(Database, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("The client is now connected to the database!")
        }).catch((err) => {
            console.log(err)
        });

    }
}