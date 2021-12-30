const { Message, MessageEmbed } = require("discord.js");
const DB = require("../schemas/AFKSystem");

module.exports = {
    name: "messageCreate",
    /**
     * 
     * @param {Message} message 
     */
    async execute(message) {
        if (message.author.bot) return;

            const Embed = new MessageEmbed()
                .setColor("RED");
            message.mentions.members.forEach((m) => {

                DB.findOne({ GuildID: message.guild.id, UserID: m.id }, async (err, data) => {
                    if (err) throw err;
                    if (!data) return;
                    else if (data)
                        Embed.setDescription(`${m} went AFK <t:${data.Time}:R>\n **status**: ${data.Status}`);
                    return message.reply({ embeds: [Embed] });
                });
            });
        }
    }