const { CommandInteraction, Client, MessageEmbed, Guild } = require("discord.js");

module.exports = {
    name: "status",
    description: "Shows the bot's status",
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const Response = new MessageEmbed()
            .setColor("#0099ff")
            .setTitle("Anti-Stats Status")
            .setDescription(`**Client**: \`🟢 ONLINE\` - \`${client.ws.ping}ms\`\n **Uptime**: <t:${parseInt(client.readyTimestamp / 1000)}:R>\n
            **__Tools__**: \n - **Discord Javscript**: \`${process.version}\`\n - **Node.js**: \`${process.version}\`\n - **Discord.js**: \`${require("discord.js").version}\`\n - **MongoDB**: \`${require("mongoose").version}\`\n - **Mongoose**: \`${require("mongoose").version}\`\n - **Discord.js-Commands**: \`${require("../../package.json").version}\``)
            .addField("**__Commands__**", `\`${client.commands.size}\` commands loaded.`, true)
            .addField("**__Guilds__**", `\`${client.guilds.cache.size}\` guilds connected.`, true)
            .addField("**__Users__**", `\`${client.users.cache.size}\` users connected.`, true)
            .setThumbnail(client.user.avatarURL({ format: "png", dynamic: true, size: 1024 }))
            .setTimestamp()
            .setFooter("Anti-Stats");

        interaction.reply({ embeds: [Response], ephemeral: true });
    }
};