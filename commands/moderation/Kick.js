const { CommandInteraction, MessageEmbed, Message, GuildMember } = require("discord.js");
const { model } = require("mongoose");
const DB = require("../../schemas/AFKSystem");

module.exports = {
    name: "kick",
    description: "kick's a specified member in the server.",
    Permission: "KICK_MEMBERS",
    options: [
        {
        name: "member",
        description: "Select a user to kick.",
        type: "USER",
        required: true
        },
        {
        name: "reason",
        description: "Leave a reason to be read by other staff members.",
        type: "STRING",
        required: true,
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     * @param {Message} message
     */
    execute(interaction, client, message) {
        const {options, channel} = interaction;
       
        const Reason = options.getString("reason");
        const Member = options.getMember("member");

        const Embed = new MessageEmbed()
        .setColor("GREEN")
        .setDescription(`🦵 | ${Member} Has been kicked.\n**Reason** ${Reason}.`)
        .setFooter({text: `He wasn't worth it to bee part of ${interaction.guild.name}! ${interaction.guild.iconURL}`});


 
                Member.kick();

                interaction.reply({embeds: [Embed], ephemeral: true});
            
    }
}