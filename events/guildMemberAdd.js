const { Client, Guild, GuildMember } = require("discord.js");
const mongoose = require("mongoose");
const DB = require("../schemas/GuildMembersAdd");

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