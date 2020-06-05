const fs = require('fs');
const guilds = require('./json/dataStorage.json');


module.exports = {
    setChannel: function (guild, {fileChannel = "", updateChannel = ""}) {
        if(guilds[guild].fileChannel == "")
        guilds[guild].fileChannel = fileChannel;
        if(guilds[guild].updateChannel == "")
        guilds[guild].updateChannel = updateChannel;

        fs.writeFile('./json/dataStorage.json', JSON.stringify(guilds, null, 4), err => {
        if (err) throw err;
        console.log('updated channel: ' + guild);
        });        
    },
    addChannel: function (guild) {
        guilds[guild] = {
            fileChannel: "",
            updateChannel: ""
        }
        console.log('adding data to storage');
        fs.writeFile('./json/dataStorage.json', JSON.stringify(guilds, null, 4), err => {
            if (err) throw err;
            console.log('created channel: ' + guild);
            });   
    },
    getChannel: function (guild) {
       return guilds[guild];
    }
}