const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "clear",
    description: "Deletes a certain amount of messages from a channel and/or a target.",
    Permission: "MANAGE_MESSAGE",
    options: [
        {
        name: "amount",
        description: "Select the amount of messages you want to delete.",
        type: "NUMBER",
        required: true
        },
        {
            name: "target",
            description: "Selects a target you have specified.",
            type: "USER",
            required: "FALSE"
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */

    async execute(interaction) {
        const { channel, options } = interaction;

        const Amount = options.getNumber("amount");
        const Target = options.getMember("target");

        const Messages = await channel.messages.fetch();

        const Response = new MessageEmbed()
        .setColor("LUMINOUS_VIVID_PINK");
        
        if(target) {
            let i = 0;
            const filtered = [];
            (await Messages).filter((m) => {
               if(m.author.id === Target.id && Amount > i) {
                   filtered.push(m);
                   i++;
               } 
            })

            await channel.bulkDelete(filtered, true).then(messages => {
                Response.setDescription(`🧹 Cleared ${message.size} from ${Target}.`);
                interaction.reply({embeds: [Response]});
            })
        } else {
            await channel.bulkDelete(Amount, true).then(messages => {
                Response.setDescription(`🧹 Cleared ${message.size} from this channel.`);
                interaction.reply({embeds: [Response]});
            })
        }
    }
 }
 