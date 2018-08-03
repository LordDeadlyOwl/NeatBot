 const Discord = require("discord.js");
 const ms = require("ms");

 module.exports.run = async (bot, message, args) => {
 
 let mUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
 if (!mUser) return message.reply("Couldn't find user.");
 if (mUser.hasPermission("KICK_MEMBERS")) return message.reply("Can't mute them!");
 if(!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send("Nope.");
 let muterole = message.guild.roles.find(`name`, "muted");
 
 let mutetime = args[1];
 if (!mutetime) return message.reply("You didn't specify a time!");
 message.reply(`<@${mUser.id}> has been muted for ${ms(mutetime)}`);


setTimeout(function(){
mUser.removeRole(muterole.id);
message.channel.send(`<@${mUser.id}> has been unmuted!`);
}, ms(mutetime));

    }

module.exports.help = {
    name: "tempmute"
}