const { model, Schema } = require("mongoose");

module.exports = model("guildMembersADD", new Schema({
    GuildID: String,
    UserID: String,
    Status: String,
    Time: String,
}))