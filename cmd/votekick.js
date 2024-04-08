const Discord = require('discord.js');
const VotingHandlerModule = require('../src/classes/voting-handler.js');

const agree    = "✅";
const disagree = "❎";

exports.run = async (bot, msg, params) => {

  if (msg.mentions.users.size === 0){
    return msg.reply(":x: " + "| Please Mention A User To Kick Next Time");
  }

  let kickmember = msg.guild.member(msg.mentions.users.first());
  if(!kickmember){
    msg.reply(":x: " + "| That User Does Not Seem Valid!");
  }

  if(!msg.guild.member(bot.user).hasPermission("KICK_MEMBERS")){
    return msg.reply(":x: " + "| i need the \"KICK_MEMBERS\" permission!").catch(console.error);
  }

  const options = [
    { name: "Yes", emoji: agree },
    { name: "No", emoji: disagree},
  ];

  const voteText = `Do you want to kick ${kickmember.user.username}? Vote now! (10 Seconds)`;
  const note = "NOTE: Votes needed to kick (3+)\n"
  let votingHandler = new VotingHandlerModule.VotingHandler(
      voteText,
      options,
      10000,
      msg.channel,
      note,
  );

  const reactions = await votingHandler.performVotingProcess();
  const YES_Count = reactions.get(agree).count ?? 0;
  const NO_Count = reactions.get(disagree).count ?? 0;

  if(YES_Count >= 4 && YES_Count > NO_Count){

    kickmember.kick().then(member => {
      msg.reply(`${member.user.username} was succesfully kicked`)
    })
  }else{

    msg.channel.send("\n" + "SAFE..... FOR NOW");
  }

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['vkick'],
  permLevel: 0
};

exports.help = {
  name: "votekick",
  description: "You dont need to be an admin to kick people",
  usage: "votekick [@MENTION]"
};
