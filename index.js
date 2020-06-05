const Discord = require('discord.js');
const client = new Discord.Client();
const data = require('./json/const.json');
const storage = require('./FileStorage');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {


    let [prefix, action, extra] = msg.content.split(" ");
    if(msg.author.bot) return;
    if (prefix != "!secretary" && prefix != "!sec" && prefix != "!sc") return;

    const guildId = msg.guild.id;
    const channelId = msg.channel.id;
    
    if (storage.getChannel(guildId) == undefined) storage.addChannel(guildId);

    switch (action != undefined?action.toLowerCase() : action) {
        
        case undefined:
            msg.channel.send("`!sc help` for more info").then((message) => {
                message.delete({timeout: 10000});
                msg.delete({timeout: 10000});
            });
            break;
        case "send":
            console.log(msg.attachments);
            break;
        case "help", "?":
            msg.channel.send('list of instructions...').then((message) => {
                message.delete({timeout: 30000});
                msg.delete({timeout: 30000});
            });
            break;

        case "tellchannel":
            if(storage.getChannel(guildId).fileChannel == channelId){
                msg.reply('this is the currently set *Files* channel');
            }else if (storage.getChannel(guildId).updateChannel == channelId){
                msg.reply('this is the currently set *Announcements* channel');
            }else{
                msg.reply('this is not a set channel');
                }
            break;
            
        case "setup":
            switch (extra != undefined? extra.toLowerCase() : extra) {
                case undefined:
                    msg.channel.send("how to set up Mr. Secretary\n" +
                        "\t!sc setup announcements:\n" +
                        "\t!sc setup files:");
                    break;
                case "announcements":
                    storage.setChannel(guildId, { updateChannel: channelId });
                    msg.channel.send("we have set this as your *Announcements* channel");
                    break;
                case "files":
                    storage.setChannel(guildId, { fileChannel: channelId });
                    msg.channel.send("we have set this as your *Files* channel");
                    break;
            }
            break;
        default:
            msg.channel.send('this is not a valid command. please enter `!sc ?` for more details').then((message) => {
                message.delete({timeout: 15000});
                msg.delete({timeout: 15000});
            });
            break;
    }
});

client.login(data.token);