const botconfig = require("./botconfig.json");
const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone: true});
const fs = require("fs");
bot.commands = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {
    if(err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.length <= 0){
        console.log("Couldnt find commands");
        return;
    }

    jsfile.forEach((f,i) => {
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });
});
bot.on("guildMemberAdd", member => {
    console.log("User " + member.user.username + " has just joined with the id of " + member.user.id + "!");
    var role = member.guild.roles.find(`name`, "Cookie");
    member.addRole(role);
  });
bot.on("ready", async () => {
    console.log(`Bot has started, with ${ bot.users.size} users, in ${ bot.channels.size} channels of ${ bot.guilds.size} guilds.`); 
    // Example of changing the bot's playing game to something useful. `client.user` is what the
    // docs refer to as the "ClientUser".
    bot.user.setActivity(`for Human Rights.`, {type: "FIGHTING"});


    
});

bot.on("message", async message =>{ 
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    
    
    if (!message.content.startsWith(botconfig.prefix)) return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);
    let commandFile = bot.commands.get(cmd.slice(prefix.length));
 
    if(commandFile) commandFile.run(bot, message, args);


});


bot.login(botconfig.token);