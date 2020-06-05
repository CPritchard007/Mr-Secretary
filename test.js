const Discord = require('discord.js');
const client = new Discord.Client();
const data = require('./json/const.json');
const fs = require('fs');
client.msgs = require('./json/dataStorage.json');
storage = require('./FileStorage')


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    var attatchment = (msg.attatchment);
    if(attatchment){
        console.log(attatchment);
    }else {
            console.log("no attachment...");
    }
});

client.login(data.token);



