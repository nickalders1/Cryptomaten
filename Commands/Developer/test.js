const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "test",
    description: "Test",
    Permission: "ADMINISTRATOR",
    /**
     * 
     * @param {Client} client
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const target = await interaction.guild.members.fetch(interaction.targetId);
        const tag = await interaction.guild.members.fetch(interaction.user.tag);

        const Response = new MessageEmbed()
        .setColor("AQUA")
        .setAuthor(tag, target.user.avatarURL({ dynamic: true, size: 512}))
        .setThumbnail(target.user.avatarURL({ dynamic: true, size: 512}))
        .addField("ID", `${target.user.id}`)
        .addField("Roles", `${target.roles.cache.map(r => r).join (" ").replace("@everyone", "") || "None"}`)
        .addField("Member Since", `<t:${parseInt(target.joinedTimestamp / 1000)}:R>`, true)
        .addField("Discord User Since", `<t:${parseInt(target.user.createdTimestamp / 1000)}:R>`, true)

        interaction.reply({embeds: Response})
    }
}