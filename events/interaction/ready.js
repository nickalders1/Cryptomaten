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
        console.log("I'm online!")
        client.user.setActivity("HELLO!", {type: "Cryptomaten"});

      if(!Database) return;
      mongoose.connect(Database, {
          useNewUrlParser: true,
          useUnifiedTopology: true
      }).then(() => {
          console.log("The client is now connected to the DataBase!")
      }).catch((err) => {
          console.log(err)
      })
    }
}