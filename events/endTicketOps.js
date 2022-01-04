const { ButtonInteraction, MessageEmbed} = require("discord.js");
const { createTranscript } = require("discord-html-transcripts");
const { TRANSCRIPTID } = require ("../config.json");
const DB = require ("../schemas/Ticket");

module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param {ButtonInteraction} interaction 
     */
    async execute(interaction) {
        if(!interaction.isButton()) return;
        const { guild, customId, channel, member } = interaction;

        if(!member.permissions.has("ADMINISTRATOR")) 
            return interaction.reply({ content: "You cannot use these buttons" });
        if(!["sluiten", "blokeer", "deblokeer"].includes(customId)) return;

        const Embed = new MessageEmbed().setColor("BLUE");

        DB.findOne({ ChannelID: channel.id }, async(err, docs) => {
            if(err) throw err;
            if(!docs) 
            return interaction.reply({
                content: "No data was found related to this ticket please delete manual.",
        ephemeral: true,
        });
        switch(customId) {
            case "blokeer" :
                if (docs.Locked == true)
                return interaction.reply({content: "this ticket is already locked",
            ephemeral: true,
        });
        await DB.updateOne({ChannelID: channel.id}, {locked: true});
        Embed.setDescription("🔒 This ticket is now locked for reviewing.");
        channel.permissionOverwrites.edit(docs.MemberID, {
            SEND_MESSAGES: false,
        });
        return interaction.reply({ embeds: [Embed] });
        break;
        case "deblokeer":
            if (docs.Locked == false)
            return interaction.reply({
                content: "this ticket is already unlocked",
        ephemeral: true,
    });
    await DB.updateOne({ChannelID: channel.id}, {locked: false});
    Embed.setDescription("🔓 This ticket is now unlocked.");
    channel.permissionOverwrites.edit(docs.MemberID, {
        SEND_MESSAGES: true,
    });
    return interaction.reply({ embeds: [Embed] });
    break;
    case "sluiten":
        if(docs.Closed == true) 
        return interaction.reply({content: "Ticket is already closed, please wait for it to get deleted",
    ephemeral: true,
    });
    const attachment = await createTranscript(channel, {
        limit: -1,
        returnBuffer: false,
        fileName: `${docs.Type} - ${docs.TicketID}.html`,
    })
    await DB.updateOne({ChannelID: channel.id}, {Closed: true});

    const Message = await guild.channels.cache.get(TRANSCRIPTID).send ({
        embeds: [
            Embed.setTitle(`Transcript Type: ${docs.Type}\nID: ${docs.TicketID}`),
        ],
                 files: [attachment],
             });

             interaction.reply({embeds: [Embed.setDescription(`The transcript is now saved [TRANSCRIPT](${Message.url})`
             ),
            ],
        });

        setTimeout(() => {
            channel.delete()
        }, 10 * 1000);
            }
        });
    },
};