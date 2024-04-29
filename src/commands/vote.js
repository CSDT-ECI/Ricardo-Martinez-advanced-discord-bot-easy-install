const VotingHandlerModule = require('../classes/voting-handler.js');

const agree = "✅";
const disagree = "❎";

exports.run = async (bot, msg, params) => {
  const options = [
    { name: "Yes", emoji: agree },
    { name: "No", emoji: disagree },
  ];

  let votingHandler = new VotingHandlerModule.VotingHandler(
    "Vote now! (10 Seconds)",
    options,
    10000,
    msg.channel
  );
  votingHandler.performVotingProcess();

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "vote",
  description: "Settle those heated debates",
  usage: "vote"
};
