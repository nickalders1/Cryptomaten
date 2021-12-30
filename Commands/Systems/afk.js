const { CommandInteraction, MessageEmbed } = require("discord.js");
const DB = require("../../schemas/AFKSystem");

module.exports = {
    name: "afk",
    description: "multi guild afk system",
    options: [
        {

        name: "set",
        type: "SUB_COMMAND",
        description: "set your afk status.",
        options: [{
            name: "status",
            description: "set your status",
            type: "STRING",
            required: true,
        }]
    }, 
    {
        name: "return",
        type: "SUB_COMMAND",
        description: "return from being afk.",
    }],
    /**
     * 
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        const { guild, options, user, createdTimestamp } = interaction;

        const Embed = new MessageEmbed()
        .setAuthor(user.tag, user.displayAvatarURL({dynamic: true}));

        const afkStatus = options.getString("status");

        try {

            switch(options.getSubcommand()) {
                case "set" : {
                    await DB.findOneAndUpdate(
                        {GuildID: guild.id, UserID: user.id},
                        {Status: afkStatus, Time: parseInt(createdTimestamp / 1000)},
                        {new: true, upsert: true}
                    )

                    Embed.setColor("GREEN").setDescription(`Your AFK status was set to: ${afkStatus}`);
                    return interaction.reply({embeds: [Embed], ephemeral: true})

                }
                case "return" : {
                    await DB.deleteOne({GuildID: guild.id, UserID: user.id});

                    Embed.setColor("RED").setDescription(`Your AFK status has been removed.`);
                    return interaction.reply({embeds: [Embed], ephemeral: true})
                }
            }
        } catch (err) {
            console.log(err)
        }
    }
}