const { CommandInteraction, MessageEmbed, MessageButton } = require('discord.js');

module.exports = {
    name: "ticketpanel",
    description: "TicketPanel",
    Permission: "ADMINISTRATOR",
    /** 
     * 
     * @param {CommandInteraction} interaction
     */


    async execute(interaction) {
        const target = await interaction.guild.members.fetch(interaction.targetId);

        let button = new MessageButton()
        .setLabel("🎫 Create Ticket!")
        .setStyle("PRIMARY")
        .setID("tic")


        const Response = new MessageEmbed()
        .setColor("AQUA")
        .setDescription(
            "__**How to make a ticket**__\n" +

            "> Click on the reaction that relates to your need\n" +

            "> Once the ticket is made you will be able to type in there"

            )
        .setTitle('Tickets')

           interaction.reply({embeds: Response, component: button})
        }
    }