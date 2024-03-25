const Discord = require('discord.js');
const VotingHandlerModule = require('../../src/classes/voting-handler.js');

describe('VotingHandler', () => {


  test('generateResultMessage should return a Discord.RichEmbed with the correct fields', () => {
    const votingHandler = new VotingHandlerModule.VotingHandler();
    const reactions = new Discord.Collection();
    reactions.set('emoji1', { count: 5 });
    reactions.set('emoji2', { count: 3 });
    votingHandler._options = [
      { emoji: 'emoji1', name: 'Option 1' },
      { emoji: 'emoji2', name: 'Option 2' }
    ];
    votingHandler.note = 'Test note';
    const resultMessage = votingHandler.generateResultMessage(reactions);
    expect(resultMessage.fields[0].name).toBe('Voting Finished:');
    expect(resultMessage.fields[0].value).toContain('Total votes (Option 1): 5');
    expect(resultMessage.fields[0].value).toContain('Total votes (Option 2): 3');
    expect(resultMessage.fields[0].value).toContain(votingHandler.note);
  });

  test('performVotingProcess should send a vote message and react with options', async () => {
    const mockedReactions = new Discord.Collection();
    mockedReactions.set('emoji1', { count: 3 });
    mockedReactions.set('emoji2', { count: 2 });
    const votingHandler = new VotingHandlerModule.VotingHandler();
    votingHandler.time = 5000;
    votingHandler.voteText = 'Test vote text';
    votingHandler._channel = {
      send: jest.fn().mockResolvedValue({
        react: jest.fn().mockResolvedValue({}),
        awaitReactions: jest.fn().mockResolvedValue(mockedReactions)
      })
    };
    votingHandler.options = [
      { emoji: 'emoji1', name: 'Option 1' },
      { emoji: 'emoji2', name: 'Option 2' },
      { emoji: 'emoji3', name: 'Option 3' }
    ];

    const reactions = await votingHandler.performVotingProcess();
    expect(reactions).toBe(mockedReactions);
    expect(votingHandler.voteText).toBe('Test vote text');
    expect(votingHandler.options.length).toBe(3);
    expect(votingHandler.time).toBe(5000);
  });

  test('validateReaction should return true if the reaction is valid', () => {
    const votingHandler = new VotingHandlerModule.VotingHandler();
    votingHandler.options = [
      { emoji: 'emoji1', name: 'Option 1' },
      { emoji: 'emoji2', name: 'Option 2' }
    ];
    const reaction = { emoji: { name: 'emoji1' } };
    expect(votingHandler.validateReaction(reaction)).toBe(true);
  });

});

