const Discord = require('discord.js');
const client = new Discord.Client();
var request = require('request');

client.on('message', message => {
    if (message.content.startsWith('/mc-info')) {
        const args = message.content.split(' ')

        if (!args[1]) return message.channel.send(`You forgot the ip !`)

        const url = "https://api.mcsrvstat.us/2/" + args[1]
	    request(url, function(err, response, body) {
            if (err) {
                console.log(err);
                return message.channel.send(`Request error (look at the console)`);
            }
            
            body = JSON.parse(body);

            if (body) {
                if (body.online === true) {
                    const embed = new Discord.MessageEmbed()
                        .setColor('GREEN')
                        .setTitle(args[1])
                        .addField('IP', body.ip, false)
                        .addField('Port', body.port, true)
                        .setTimestamp()
                    message.channel.send(embed)
                } else {
                    const embed = new Discord.MessageEmbed()
                        .setColor('RED')
                        .setTitle(args[1])
                        .setDescription("The server is offline !")
                        .setTimestamp()
                    message.channel.send(embed)
                }
            }
        })
    }
})

client.login('MTAwMzY1MDQ4NjI1MzEzMzg5NQ.GjlUqF.YB5BvWijY-DedAu5j8bcmSyKp7kXoMT3gzFxlU');