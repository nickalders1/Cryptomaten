const { MessageEmbed, CommandInteraction } = require("discord.js");

module.exports = {
    name: "userinfocommand",
    description: "get a specified members information.",
    Permission: "MANAGE_MESSAGES",
    options: [
        {
        name: "member",
        description: "select a user to get their information.",
        type: "USER",
        required: true
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const {options} = interaction;
        const Member = options.getMember("member");
        const target = await interaction.guild.members.fetch(Member.id);

        const Response = new MessageEmbed()
        .setColor("AQUA")
        .setAuthor(target.user.tag, target.user.avatarURL({ dynamic: true, size: 512}))
        .setThumbnail(target.user.avatarURL({ dynamic: true, size: 512}))
        .addField("ID", `${target.user.id}`)
        .addField("Roles", `${target.roles.cache.map(r => r).join (" ").replace("@everyone", "") || "None"}`)
        .addField("Member Since", `<t:${parseInt(target.joinedTimestamp / 1000)}:R>`, true)
        .addField("Discord User Since", `<t:${parseInt(target.user.createdTimestamp / 1000)}:R>`, true)

        interaction.reply({embeds: [Response], ephemeral: false})
    }
}