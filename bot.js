const Discord = require('discord.js');
const bot = new Discord.Client();
const PREFIX = "!"

bot.on('ready', () => {
    console.log('Discord bot running');
    console.log(bot.guilds);
    bot.guilds.forEach(function (g) {
        var c = g.channels.find("name", "rank-set-update");
        c.fetchMessages().then(function (messages) {
            messages.forEach(function (m) {
                console.log(m.content + " Emojis, triggered");
                m.awaitReactions(function () {
                    return true;
                })
            });
        });
    });
    bot.user.setPresence({
        game: {
            name: ' +help | Rush Hour Discord Bot',
            type: 0
        }
    });
})
bot.on('guildMemberAdd', member => {
    // New user joined server
    member.send("Welcome to Rush Hour you can start by setting your rank in the #rank-set-update channel!");

})
bot.on('message', message => {
    if (message.author.bot) return;
    // Message
})
bot.on("messageReactionAdd", (reaction = messageReaction, user) => {
    var name = reaction.emoji.name

    console.log(name);

    var role = reaction.message.member.guild.roles.find('name', name.replace('_', ' '));
    var member = reaction.message.guild.member(user);
    member.addRole(role).catch(err => console.log(err));
})
bot.on("messageReactionRemove", (reaction = messageReaction, user) => {
    var name = reaction.emoji.name

    console.log(name);

    var role = reaction.message.member.guild.roles.find('name', name.replace('_', ' '));
    var member = reaction.message.guild.member(user);
    member.removeRole(role).catch(err => console.log(err));
})

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

// Logs "Bot is Launched" when the bot is online
bot.on("ready", function() {
    console.log("Bot is Launched");
});

// Makes sure the user adds the + prefix
bot.on("message", function(message) {
    if (message.author.equals(bot.user)) return;

    if (!message.content.startsWith(PREFIX)) return;

    var args = message.content.substring(PREFIX.length).split(" ");

// START OF COMMANDS!
    switch (args[0].toLowerCase()) {
            
         // Kicks a user with a command (Must Me Admin+)
         case "kick": {
            let modRole = message.guild.roles.find("name", "Admin")
            if(!message.member.roles.has(modRole.id)) {
                return message.reply("You must be **Admin** to preform this command")
                    break;
            }
            if(message.mentions.users.size === 0) {
                return message.reply("Please mention a user to kick!")
            }
            let kickMember = message.guild.member(message.mentions.users.first())
            if(!kickMember) {
                return menssage.reply("That user is not in the Discord!")
            }
           if (!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")) {
                return message.reply("I dont have enough permmisions")
           }
           kickMember.kick().then(member => {
                message.reply(`${member.user.username} has been kicked.`).catch(console.error);
        });
    }
        break;

         // Mutes a user with a command (Must Me Mod+)
         case "mute": {
            let modRole = message.guild.roles.find("name", "Mod")
            if(!message.member.roles.has(modRole.id)) {
                return message.reply("You must be **Mod** to preform this command")
                    break;
            }
            if(message.mentions.users.size === 0) {
                return message.reply("Please mention a user to mute!")
            }
            let member = message.guild.member(message.mentions.users.first())
            if(!member.addRole) {
                return menssage.reply("That user is not in the Discord!")
            }
           if (!message.guild.member(bot.user).hasPermission("MANAGE_ROLES")) {
                return message.reply("I dont have enough permmisions")
           }
           member.addRole(member.guild.roles.find("name", "Muted")).then(member => {
                message.reply(`${member.user.username} has been muted.`).catch(console.error);
        });
    }
        break;

         // Unmutes a user with a command (Must Me Mod+)
         case "unmute": {
            let modRole = message.guild.roles.find("name", "Mod")
            if(!message.member.roles.has(modRole.id)) {
                return message.reply("You must be **Mod** to preform this command")
                    break;
            }
            if(message.mentions.users.size === 0) {
                return message.reply("Please mention a user to unmute!")
            }
            let member = message.guild.member(message.mentions.users.first())
            if(!member.removeRole) {
                return menssage.reply("That user is not in the Discord!")
            }
           if (!message.guild.member(bot.user).hasPermission("MANAGE_ROLES")) {
                return message.reply("I dont have enough permmisions")
           }
           member.removeRole(member.guild.roles.find("name", "Muted")).then(member => {
                message.reply(`${member.user.username} has been unmuted.`).catch(console.error);
        });
    }
        break;

        // Bans a user with a command (Must be Admin)
        case "ban": {
            let modRole = message.guild.roles.find("name", "Admin")
            if(!message.member.roles.has(modRole.id)) {
                return message.reply("You must be **Admin** to preform this command")
                    break;
            }
            if(message.mentions.users.size === 0) {
                return message.reply("Please mention a user to ban!")
            }
            let banMember = message.guild.member(message.mentions.users.first())
            if(!banMember) {
                return menssage.reply("That user is not in the Discord!")
            }
           if (!message.guild.member(bot.user).hasPermission("BAN_MEMBERS")) {
                return message.reply("I dont have enough permmisions")
           }
           banMember.ban().then(member => {
                message.reply(`${member.user.username} has been banned.`).catch(console.error);
        });
    }
        break;

        // User sends !Rush bot sends Hour!
            case "rush":
            message.channel.sendMessage("Hour!");
            break;

        // User sends !1-10 bot picks a random number and says it.
        case "1-10":
            if (args[0]) message.channel.sendMessage(random[Math.floor(Math.random()* random.length)]);
            else message.channel.sendMessage("Invalid Arguments, !1-10");
            break;

        // User sends !staff and it outputs a list of staff that can help them
        case "staff":
            var staff = new Discord.RichEmbed()
                .addField("__Owner(s)__", "@Zach#8475 , @420Coon#3481", true)
                .addField("__Admin(s)__", "N/A", true)
                .addField("__Moderator(s)__", "@kaoticxkillerx#9688 , @Silmaril#1845 , @Samaritan#6760  ,  @Aspect360#4980 , @Theclamhammer69#9997 ")
                .addField("__Mod(s) In Training__" , " N/A ")
                .setColor(0xc30000)
                .setFooter("Message anyone of these people to get help!")
                .setTitle("__**Staff Members**__")
            message.channel.sendEmbed(staff);
            break;

        // User sends !help and it outputs a list of all the bots commands
        case "help":
            var help = new Discord.RichEmbed()
                .addField("__!rush__", "Outputs Hour! ", true)
                .addField("__!1-10__","Picks a random number 1-10", true)
                .addField("__!staff__","Sends a list of our staff members!")
                .addField("__!onJoin__", "Shows what the bot does to a user when the user join the server")
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

                    // User sends !staffCommands and it outputs staff commands
        case "staffCommands":
        var staffCommands = new Discord.RichEmbed()
            .addField("__!mute @(Name)__", "Mutes the member mentioned (Mod+)", true)
            .addField("__!unmute @(Name)__","Unmutes the member mentioned (Mod+)", true)
            .addField("__!kick @(Name)__", "Kicks the member mentioned (Admin+)")
            .addField("__!ban @(Name)__", "Bans the member mentioned (Admin+)")
            .setColor(0xc30000)
            .setFooter("That is all the commands staff can do!")
            .setTitle("__**Staff commands:**__")
        message.channel.sendEmbed(staffCommands).catch(console.error);
        break;

        // If the command is invalid it outputs this message
        default:
            message.channel.sendMessage("Invalid command please do !help");
    }
});

bot.login('Mzc2ODg0NjQwNjIxMDAyNzYy.DOJ2OA.e6ioZuQ487aC53SoeNAOTPbMrko');
