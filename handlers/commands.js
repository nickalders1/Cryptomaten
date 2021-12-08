<<<<<<< HEAD
const { Perms } = require("../validations/Permissions");
=======
const { perms, Perms } = require("../validations/permissions");
>>>>>>> parent of 3c06c58 (added event handler)
const { Client } = require("discord.js");
const { promisify } = require("util");
const { glob } = require("glob");
const PG = promisify(glob);
const Ascii = require("ascii-table");
<<<<<<< HEAD
=======
const { guildid } = require("./json/guildid.json");
const { resourceUsage } = require("process");
>>>>>>> parent of 3c06c58 (added event handler)

/**
 * @param {Client} client
 */
module.exports = async (client) => {
    const Table = new Ascii("Command Loaded");

    CommandsArray = [];

    (await PG(`${process.cwd()}/Commands.*/*.js`)).map(async (file) => {
        const command = require(file);

        if(!command.name)
        return Table.addRow(file.split("/")[7], "🔸FAILED", "Missing a name.")

        if(!command.description)
        return Table.addRow(command.name, "🔸FAILED", "Missing a description.")

        if(command.permission) {
            if(Perms.includes(command.permission))
            command.defaultPermission = false;
            else
            return Table.addRow(command.name, "🔸FAILED", "Permission is invalid.")
        }

        client.commands.set(command.name, command);
        CommandsArray.push(command);

<<<<<<< HEAD
        await Table.addRow(command.name, "🔹SUCCESFULL:");
=======
        await Table.addRow(command.name, "SUCCESFUL:")
>>>>>>> parent of 3c06c58 (added event handler)
    });

    console.log(Table.toString());

    // permissions check //

    client.on("ready", async () => {
        const MainGuild = await client.guilds.cache.get(guildid)

        MainGuild.commands.set(CommandsArray).then(async (command) => {
            const Roles = (commandName) => {
                const comdPerms = CommandsArray.find((c) => c.name === commandName).permission;
                if(!comdPerms) return null;

                return MainGuild.roles.cache.filter((r) => r.permissions.has(comdPerms));
            }

            const fullPermissions = command.reduce((accumulator, r) => {
                const roles= Roles(r.name);
                if(!roles) return accumulator;

                const permissions = roles.reduce((a, r) => {
                    return [...a, {id: r.id, type: "ROLE", permission: true}]
                }, []);

                return [...accumulator, {id: r.id, permissions}]
            }, []);
            await MainGuild.commands.permissions.set({ fullPermissions});
        });
    });
}