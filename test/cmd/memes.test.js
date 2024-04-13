const axios = require('axios');
jest.mock('axios');

const memes = require('../../cmd/memes');

describe('memes', () => {
  describe('getRandomMeme', () => {
    it('should fetch a random meme from reddit', async () => {
      const mockMeme = {
        title: 'mock title',
        url: 'mock image',
        subreddit: 'mock subreddit',
        permalink: 'mock permalink'
      };
      axios.get.mockResolvedValue({
        data: [
          {
            data: {
              children: [
                {
                  data: mockMeme
                }
              ]
            }
          }
        ]
      });
      const { url, ...mockMemeData } = mockMeme;
      const expectedMeme = {
        ...mockMemeData,
        image: url,
        permalink: `https://reddit.com${mockMeme.permalink}`
      };

      const meme = await memes.getRandomMeme();
      expect(meme).toEqual(expectedMeme);
    });

    it('should return null and log an error if the fetch fails', async () => {
      console.error = jest.fn();
      axios.get.mockRejectedValue(new Error('mock error'));

      const meme = await memes.getRandomMeme();
      expect(meme).toBeNull();
      expect(console.error).toHaveBeenCalledWith('Error fetching meme:', new Error('mock error'));
    });
  });

});