const { MessageEmbed, Message, WebhookClient } = require("discord.js");


module.exports = {
    name: "messageUpdate",
    /**
     * 
     * @param {Message} oldMessage 
     * @param {Message} newMessage 
     */
    execute(oldMessage, newMessage) {
        if(oldMessage.author.bot) return; // this lets the bot ignore messages that were send by bots.

        if(oldMessage.content === newMessage.content) return; //this ignores a log if the edited message is the same as the old one

        const Count = 1950;
        const Original = oldMessage.content.slice(0, Count) + (oldMessage.content.length > 1950 ? "..." : "");
        const Edited = newMessage.content.slice(0, Count) + (oldMessage.content.length > 1950 ? "..." : "");

        const Log = new MessageEmbed()
        .setColor("#36393f")
        .setDescription(`📘 A [message](${newMessage.url}) by ${newMessage.author} was **edited** in ${newMessage.channel}.\n
        **original**: \n ${Original} \n**edited**:\n ${Edited} `.slice(0, 4096))
        .setFooter(`Member: ${newMessage.author.tag} | ID: ${newMessage.author.id}`);

        new WebhookClient({url: "https://discord.com/api/webhooks/925347923791863848/M3Gu_3LVAVq-s3l4doikGQG6wymWsutgp0e5KkrXKiXnca7NhZibzjQ7HTNZg31MP9vF"}
        ).send({embeds: [Log]}).catch((err) => console.log(err));
    }
}