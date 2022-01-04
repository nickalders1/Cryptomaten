const { MessageEmbed, CommandInteraction} = require("discord.js");
const DB = require("../../schemas/Ticket");

module.exports = {
    name: "ticket",
    description: "Ticket Actions",
    Permission: "ADMINISTRATOR",
    options: [
        {
            name: "action",
            type: "STRING",
            description: "Add or remove a member from this ticket",
            require: true,
            choices: [
                {name: "Add", value: "add"},
                {name: "Remove", value: "remove"},
            ],
        },
        {
            name: "member",
            description: "select a member",
            type: "USER",
            require: true,
        },
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const {guildId, options, channel} = interaction;

        const Action = options.getString("action");
        const Member = options.getMember("member");

        const Embed = new MessageEmbed();

        switch(Action) {
            case "add":
                DB.findOne({GuildID: guildId, ChannelID: channel.id}, 
                    async (err, docs) => {
                    if (err) throw err;
                    if (!docs)
                    return interaction.reply({embeds: [Embed
                            .setColor("RED")
                            .setDescription("⛔ | This channel is not tied with a ticket."
                        ),
                       ],
                       ephemeral: true,
                     });
                     if (docs.MembersID.includes(Member.id))
                     return interaction.reply({embeds: [Embed
                        .setColor("RED")
                        .setDescription("⛔ | This member is already added to this ticket."
                    ),
                   ],
                   ephemeral: true,
                 });
                 docs.MembersID.push(Member.id);

                 channel.permissionOverwrites.edit(Member.id, {
                     SEND_MESSAGES: true,
                     VIEW_CHANNEL: true,
                     READ_MESSAGE_HISTORY: true,
                 });

                 interaction.reply({embeds: [Embed
                    .setColor("GREEN")
                    .setDescription(`✅ | ${Member} has been added to this ticket.`),
                ],
            });
            docs.save();
            }
         );
                break;
            case "remove":
                DB.findOne({GuildID: guildId, ChannelID: channel.id}, 
                    async (err, docs) => {
                    if (err) throw err;
                    if (!docs)
                    return interaction.reply({embeds: [Embed
                            .setColor("RED")
                            .setDescription("⛔ | This channel is not tied with a ticket."
                        ),
                       ],
                       ephemeral: true,
                     });
                     if (!docs.MembersID.includes(Member.id))
                     return interaction.reply({embeds: [Embed
                        .setColor("RED")
                        .setDescription("⛔ | This member is not in this ticket."
                    ),
                   ],
                   ephemeral: true,
                 });
                 docs.MembersID.remove(Member.id);

                 channel.permissionOverwrites.edit(Member.id, {
                     VIEW_CHANNEL: false,
                 });

                 interaction.reply({embeds: [Embed
                    .setColor("GREEN")
                    .setDescription(`✅ | ${Member} has been removed from this ticket.`),
                ],
            });
            docs.save ();
            }
         );
                break;
        }
    },
};