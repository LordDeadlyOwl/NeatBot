const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!kUser) return message.channel.send("Couldn't find user.");
    let kReason = args.join(" ").slice(22); 
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Nope.");
    if(kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("You cannot kick this member.");



    let kickEmbed = new Discord.RichEmbed()
    .setDescription("--Kick--")
    .setColor("#ff0000")
    .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
    .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Kicked at", message.createdAt)
    .addField("Reason", kReason);

    let kickChannel = message.guild.channels.find(`name`, "rythm");
    if(!kickChannel) return message.channel.send("Cant find channel");
    
    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);
}

module.exports.help = {
    name: "kick"
}