const { ButtonInteraction, MessageEmbed, MessageActionRow, MessageButton} = require("discord.js");
const DB = require("../schemas/Ticket");
const { PARENTID, EVERYONEID } = require("../config.json");

module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param {ButtonInteraction} interaction 
     */
    async execute(interaction) {
        if(!interaction.isButton()) return;

    const { guild, member, customId} = interaction;

        if(!["junioren", "senioren", "anders"].includes(customId)) return;

        const ID = Math.floor(Math.random() * 90000) + 10000;

        await guild.channels.create(`${customId + "-" + ID}`, {
            type: "GUILD_TEXT",
            parent: PARENTID,
            permissionOverwrites: [
                {
                    id: member.id,
                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
                },
                {
                    id: EVERYONEID,
                    deny: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
                },
            ],
        }).then(async(channel) => {
            await DB.create({
                GuildID: guild.id,
                MembersID: member.id,
                TicketID: ID,
                ChannelID: channel.id,
                Closed: false,
                Locked: false,
                Type: customId,
            });

            const Embed = new MessageEmbed()
            .setAuthor(`${guild.name} | Ticket: ${ID}`,
            guild.iconURL({ dynamic: true })
        )
            .setDescription("een moment geduld a.u.b. een team lid zal spoedig bij u zijn.")
            .setFooter({text: "De knoppen hier beneden zijn staff only knoppen."})
    
            const Buttons = new MessageActionRow();
            Buttons.addComponents(
                new MessageButton()
                .setCustomId("sluiten")
                .setLabel("Sla op & Sluit")
                .setStyle("PRIMARY")
                .setEmoji("💿"),
                new MessageButton()
                .setCustomId("blokeer")
                .setLabel("Blokeer")
                .setStyle("SECONDARY")
                .setEmoji("🔒"),
                new MessageButton()
                .setCustomId("deblokeer")
                .setLabel("Deblokeer")
                .setStyle("SUCCESS")
                .setEmoji("🔓")
            );
    
            channel.send({ 
            embeds: [Embed], 
            components: [Buttons]
        });
        await channel
        .send({ content: `${member} here is your ticket` })
        .then((m) => {
            setTimeout(() => {
                m.delete().catch(() => {});
                },    1 * 5000);
            });
    
        interaction.reply({content: `${member} your ticket has been created: ${channel}`,
        ephemeral: true 
            });
        });
    },
};