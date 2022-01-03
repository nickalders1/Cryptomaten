const {MessageEmbed, CommandInteraction, MessageActionRow, MessageButton} = require("discord.js");
const { OPENTICKET } = require("../../config.json");

module.exports = {
    name: "ticket",
    description: "setup your ticket message.",
    Permission: "ADMINISTRATOR",
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const { guild } = interaction;

        const Embed = new MessageEmbed()
        .setAuthor(
            guild.name + " | Ticket System",
            guild.iconURL({ dynamic: true })
        )
        .setDescription("Open een ticket voor 1 van de redenen op de knoppen")
        .setColor("#36393f");

        const Buttons = new MessageActionRow();
        Buttons.addComponents(
            new MessageButton()
        .setCustomId("junioren")
        .setLabel("Junioren")
        .setStyle("PRIMARY")
        .setEmoji("📜"),
        new MessageButton()
        .setCustomId("senioren")
        .setLabel("Senioren")
        .setStyle("SECONDARY")
        .setEmoji("📜"),
        new MessageButton()
        .setCustomId("anders")
        .setLabel("Anders")
        .setStyle("SUCCESS")
        .setEmoji("🚨")
        );

        await guild.channels.cache.get(OPENTICKET)
        .send({ embeds: [Embed], components: [Buttons] });

        interaction.reply({ content: "Done", ephemeral: true});

    },
};