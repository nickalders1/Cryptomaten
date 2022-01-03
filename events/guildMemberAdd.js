const { Client, Guild, GuildMember } = require("discord.js");
const mongoose = require("mongoose");
const DB = require("../schemas/guildMembersAdd");

module.exports = {
    name: "memberBan",
    /**
     * 
     * @param {Client} client 
     */
    execute(client){
        GuildMember.id
    }
}