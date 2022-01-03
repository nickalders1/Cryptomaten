const { CommandInteraction, MessageEmbed } = require("discord.js");
const { model } = require("mongoose");
const DB = require("../../schemas/AFKSystem");

module.exports ={
    name: "massban",
    description: "Ban's the given ammount of the last joined members in the server.",
    Permission: "BAN_MEMBERS",
    options: [
        {
        name: "amount",
        description: "Select the amount members you want to ban",
        type: "NUMBER",
        required: true
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    execute(interaction, client) {
        
    }
}