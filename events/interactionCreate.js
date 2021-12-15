const { Client, CommandInteraction, messageEmbed } = require("discord.js");

module.exports ={
    name: "interactionCreate",
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        if (interaction.isCommand() || interaction.isContextMenu()) {
            const command= client.commands.get(interaction.commandName);
            if(!command) return interaction.reply({embeds: [
                new messageEmbed()
                .setColor("RED")
                .setDescription("⛔ An error has occured while running this command.")
            ]}) && client.commands.delete(interaction.commandName);

            command.execute(interaction, client)
        }
    }
}