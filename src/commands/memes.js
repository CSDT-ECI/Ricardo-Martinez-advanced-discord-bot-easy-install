
const Discord = require('discord.js');
const axios = require('axios');


/**
 * The function `getRandomMeme` fetches a random meme from the r/memes subreddit on Reddit and returns its title, image URL, subreddit name, and permalink.
 * @returns The `getRandomMeme` function returns a Promise that resolves to an object containing information about a random meme with the following properties:
 * - `title`: The title of the meme post
 * - `image`: The URL of the meme image
 * - `subreddit`: The subreddit where the meme was posted
 * - `permalink`: The permalink URL of the meme post on Reddit
 *
 * If there is an error during the fetching process, the function will return `null`.
 */
async function getRandomMeme() {
  try {
    const response = await axios.get('https://www.reddit.com/r/memes/random/.json');
    const post = response.data[0].data.children[0].data;
    const meme = {
      title: post.title,
      image: post.url,
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

exports.getRandomMeme = getRandomMeme;