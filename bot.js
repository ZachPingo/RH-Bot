const Discord = require('discord.js');
const bot = new Discord.Client();

bot.on('ready', () => {
    console.log('Discord bot running');
    console.log(bot.guilds);
    bot.guilds.forEach(function (g) {
        var c = g.channels.find("name", "rank-set");
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
            name: ' Zach is Bronze 2',
            type: 0
        }
    });
})
bot.on('guildMemberAdd', member => {
    // New user joined server
    member.send("Welcome to Critical eSports!");

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
bot.login('Mzc2ODg0NjQwNjIxMDAyNzYy.DOJ2OA.e6ioZuQ487aC53SoeNAOTPbMrko');
