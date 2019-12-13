1) auth.json
token should be the bot token

2) no-pings.json
Just some simple lists to reference in the script
"serverId" => (guild_id) The Id of the server you want the bot to look for messages on
"responseToUser" => The message you want to DM the user 'breaking the rules'

"userIdsToExcludeFromTrigger" => Any individual User Ids you would like to exclude from the message check.
Whether its the Bot Id or a Mod Id; Adding the Id to this list will stop the trigger from continuing.
IE: A mod pinging a mod would be allowed so you would want to skip the message check

"roleIdsToExcludeFromTrigger" => Any Role Ids you would like to exclude from the message check.
Same as above, should be self-explanatory.

"usersToCheckFor" => Any individual User Ids you would like the trigger to check in a pinged message.
If one or more of the pinged users match an Id in this list, the bot will delete the message and DM the user
who created the message

"rolesToCheckFor" => Any Role Ids you would like the trigger to check in a pinged message.
If one or more of the pinged users are in a role that matches an Id in this list, the bot will delete the message and DM the user
who created the message