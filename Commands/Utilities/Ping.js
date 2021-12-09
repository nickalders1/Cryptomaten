const { MessageEmbed } = require('discord.js');

module.exports ={
    name: "ping",
    aliases: ['latency', 'lag'],
    Permissions: "ADMINISTRATOR",
    description: "Sends the client's ping",
    cooldown: 5,
    execute(message, args, commandName, client, Client) {
        const Response = new MessageEmbed()
        .setColor("GREEN")
        .setDescription(`🏓 ${clients.ws.ping}ms`);
        message.channel.send({embeds: [Response]});
    }
}