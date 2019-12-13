const Discord = require('discord.io');
const auth = require('./auth.json');

const noPingInfo = require("./no-pings.json")

const client = new Discord.Client({
    token: auth.token,
    autorun: true
 });

// Initialize Discord Bot
client.on('ready', function (evt) {
    console.log('Connected');
    console.log(`${client.username} ' - (' ${client.id} ')`);
});

var userIdsToExcludeFromTrigger = noPingInfo.userIdsToExcludeFromTrigger
var roleIdsToExcludeFromTrigger = noPingInfo.roleIdsToExcludeFromTrigger
var usersToCheckFor = noPingInfo.usersToCheckFor
var rolesToCheckFor = noPingInfo.rolesToCheckFor
var serverId = noPingInfo.serverId

var messageForUser = noPingInfo.responseToUser

client.on('messageCreate', function (user, userID, channelID, message, evt) {
    var currentServerId = evt.d.guild_id
    if (!currentServerId || currentServerId !== serverId) {
        return
    }
    var rolesOfUser = evt.d.member.roles
    var isExcludedRole = roleIdsToExcludeFromTrigger.some(v => rolesOfUser.includes(v))
    if (userIdsToExcludeFromTrigger.includes(userID) || isExcludedRole) { 
        return
    }
    console.log(`Received message : ${message}`)

    var messageId = evt.d.id

    // Collect all the userIds that were pinged
    var usersPinged = evt.d.mentions.map(function (user) {
        return user.id
    });

    // Collect all the roleIds that were pinged based off of each user
    var rolesPinged = evt.d.mentions.map(function (user) {
        return user.member.roles.map(function(role) {
             return role
         })
    });

    // Reduce the mapped array to a 1D array
    if (rolesPinged.length > 0) {
        rolesPinged = rolesPinged.reduce(function(a, b){ return a.concat(b); });
    }

    const modWasPinged = usersToCheckFor.some(v => usersPinged.includes(v))
    const modRoleWasPinged = rolesToCheckFor.some(v => rolesPinged.includes(v))

    if (modWasPinged || modRoleWasPinged) {
        client.deleteMessage({
            channelID: channelID,
            messageID: messageId
        }, function(error) {
            if (error) {
                console.log("Error : ", error)
            } else {
                console.log(`Deleted message : ${message}`)
                client.sendMessage({
                    to: userID,
                    message: messageForUser
                });
            }
        })    
    }
});