const axios = require('axios');

async function getRandomMeme() {
  try {
    const response = await axios.get('https://www.reddit.com/r/memes/random/.json');
    const post = response.data[0].data.children[0].data;
    const meme = {
      title: post.title,
      image: post.url_overridden_by_dest,
      subreddit: post.subreddit,
      permalink: `https://reddit.com${post.permalink}`
    };
    return meme;
  } catch (error) {
    console.error('Error fetching meme:', error);
    return null;
  }
}

exports.run = async (bot, msg, params) => {

  const meme = await getRandomMeme();
  const embedMsg = new Discord.RichEmbed()
    .setTitle(meme.title)
    .setImage(meme.image)
    .setColor("Blue");
  msg.channel.send(embedMsg);

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['meme', 'dank'],
  permLevel: 0
};

exports.help = {
  name: "memes",
  description: "Get a random meme from reddit",
  usage: "memes"
};
