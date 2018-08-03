const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!bUser) return message.channel.send("Couldn't find user.");
    let bReason = args.join(" ").slice(22); 
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Nope.");
    if(bUser.hasPermission("KICK_MEMBERS")) return message.channel.send("You cannot ban this member.");



    let banEmbed = new Discord.RichEmbed()
    .setDescription("--Ban--")
    .setColor("#ff0000")
    .addField("Banned User", `${bUser} with ID ${bUser.id}`)
    .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Banned at", message.createdAt)
    .addField("Reason", bReason);

    let banChannel = message.guild.channels.find(`name`, "rythm");
    if(!banChannel) return message.channel.send("Cant find channel");
    
    message.guild.member(bUser).ban(bReason);
    kickChannel.send(banEmbed);
    }

module.exports.help = {
    name: "ban"
}