const Discord = require("discord.js");

const TOKEN = "Mzc2MTIzNzk3NzU1MTMzOTcy.DN52IA.SSMinn0i5jtcGPqHJoopQ_mcDY0"
const PREFIX = "+"

// The random numbers for the +1-10 command
var random = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10"
];

var bot = new Discord.Client();

// Logs "Bot is Launched" when the bot is online
bot.on("ready", function() {
    console.log("Bot is Launched");
});

  message.awaitReactions(function(message) {
      if (addReaction.message.id = 376946870595092490)
        message.channel.sendMessage("Whoo!");        
        else return true;                     
})


// When a user joins it sends this message in the #member-welcome chat
bot.on("guildMemberAdd", function(member) {
    member.guild.channels.find("name", "member-welcome").sendMessage(member.toString() + " **Welcome to Critical eSports!** You can start by setting your rank in the #rank-set channel!");
// Auto sets the persons rank to Unverified
    member.addRole(member.guild.roles.find("name", "Unverified"));
});

// Makes sure the user adds the + prefix
bot.on("message", function(message) {
    if (message.author.equals(bot.user)) return;

    if (!message.content.startsWith(PREFIX)) return;

    var args = message.content.substring(PREFIX.length).split(" ");
// START OF COMMANDS!
    switch (args[0].toLowerCase()) {
        // User sends !Critical bot sends eSports!
            case "critical":
            message.channel.sendMessage("eSports!");
            break;

        // User sends !1-10 bot picks a random number and says it.
        case "1-10":
            if (args[0]) message.channel.sendMessage(random[Math.floor(Math.random()* random.length)]);
            else message.channel.sendMessage("Invalid Arguments, !1-10");
            break;

        // Sets the bots status
        case "status":
            bot.user.setStatus("Do Not Disturb")
            break;

        // Sets the bots game
        case "game":
            bot.user.setGame("Critical eSports")
            message.channel.sendMessage("Game is now set to __**Critical eSports**__");
            break;

        // User sends !staff and it outputs a list of staff that can help them
        case "staff":
            var staff = new Discord.RichEmbed()
                .addField("__Owner(s)__", "@Zach#8475", true)
                .addField("__Admin(s)__", "@420Coon#3481", true)
                .addField("__Moderator(s)__", "@kaoticxkillerx#9688 , @Theclamhammer69#9997 , @Samaritan#6760  ,  @Aspect360#4980")
                .addField("__Mod(s) In Training__" , "@Silmaril#1845")
                .setColor(0xc30000)
                .setFooter("Message anyone of these people to get help!")
                .setTitle("__**Staff Members**__")
            message.channel.sendEmbed(staff);
            break;

        // User sends !help and it outputs a list of all the bots commands
        case "help":
            var help = new Discord.RichEmbed()
                .addField("__+critical__", "Outputs eSports ", true)
                .addField("__+1-10__","Picks a random number 1-10", true)
                .addField("__+staff__","Sends a list of our staff members!")
                .addField("__+onJoin__", "Shows what the bot does to a user when the user join the server")
                .setColor(0xc30000)
                .setFooter("That is all the commands! (More to come in the near future)")
                .setTitle("__**Command List**__")
            message.channel.sendEmbed(help);
            break;

        // User sends !onJoin and it outputs what the bot does when a user joins the server
        case "onjoin":
            var onjoin = new Discord.RichEmbed()
                .addField("__Auto Role__", "Automaticly Sets the users role to **Unverified**", true)
                .addField("__Welcome Message__","Send a welcome message to the user telling them how to set there rank", true)
                .addField("__Member Log__", "Logs all of the members that join" , true)
                .setColor(0xc30000)
                .setFooter("That is all the bots got when people first join!")
                .setTitle("__**When a person join the discord the bot does these 3 things:**__")
            message.channel.sendEmbed(onjoin);
            break;

            
        // If the command is invalid it outputs this message
        default:
            message.channel.sendMessage("Invalid command please do !help");
    }
});

bot.login(TOKEN);
