const Discord = require('discord.js');
class VotingHandler {

  _voteText = null;
  _options = [];
  _time = 10000;
  _channel = null;
  _note = '';

  constructor(voteText, options, time, channel, note = '') {
    this._voteText = voteText;
    this._options = options;
    this._time = time;
    this._channel = channel;
    this._note = note;
  }

  get voteText() {
    return this._voteText;
  }

  get options() {
    return this._options;
  }

  get time() {
    return this._time;
  }

  get note() {
    return this._note;
  }

  set voteText(voteText) {
    this._voteText = voteText;
  }

  set options(options) {
    this._options = options;
  }

  set time(time) {
    this._time = time;
  }

  set note(note) {
    this._note = note;
  }

  validateReaction = reaction => {
    return this._options.some(option => option.emoji === reaction.emoji.name)
  };

  async performVotingProcess(color = "0x#FF0000") {
    let voteMessage = await this._channel.send(this._voteText);
    this._options.forEach(option => {
      voteMessage.react(option.emoji);
    });

    const reactions = await voteMessage.awaitReactions(
      this.validateReaction,
      {
        time: this._time
      }
    );

    const resultMessage = this.generateResultMessage(reactions);
    resultMessage.setColor(color);
    this._channel.send({ embed: resultMessage });

    return reactions;
  }

  generateResultMessage(reactions) {
    let countsMessage = "";
    this._options.forEach(option => {
      let count = reactions.get(option.emoji)?.count ?? 0;
      countsMessage += `Total votes (${option.name}): ${count}\n`;
    });

    const resultMessage = new Discord.RichEmbed()
      .addField(
        "Voting Finished:",
        "----------------------------------------\n" +
        countsMessage +
        this.note +
        "----------------------------------------"
      );

    return resultMessage;

  }

}

exports.VotingHandler = VotingHandler;