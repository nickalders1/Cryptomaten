const { MessageEmbed, Message, WebhookClient} = require("discord.js");

module.exports = {
    name: "messageDelete",
    /**
     * 
     * @param {Message} message 
     */
    execute(message) {
        if( message.author.bot) return;

        const Log = new MessageEmbed()
        .setColor("#36393f")
        .setDescription(`📕 A [message](${message.url}) by ${message.author} was **deleted** in ${message.channel}.\n
        **Deleted Message:**\n ${message.content ? message.content: "None"}`.slice(0, 4096));
        
        if(message.attachments.size >= 1){ 
            Log.addField(`Attachments:`, `${message.attachments.map(a => a.url)}`, true)
        }

        new WebhookClient({url: "https://discord.com/api/webhooks/925347923791863848/M3Gu_3LVAVq-s3l4doikGQG6wymWsutgp0e5KkrXKiXnca7NhZibzjQ7HTNZg31MP9vF"}
        ).send({embeds: [Log]}).catch((err) => console.log(err));

    }
}