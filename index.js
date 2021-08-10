const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.once('ready', () => {
	console.log('Ready!');
});

client.on('messageCreate', m => {
	console.log(`got message ${m}`);
	let channel = m.channel;

	// code from https://discord.js.org/#/docs/main/stable/class/TextChannel?scrollTo=awaitMessages
	const filter = m => m.content.startsWith('!vote');
	// Errors: ['time'] treats ending because of the time limit as an error
	channel.awaitMessages({ filter, max: 1, time: 60000, errors: ['time'] })
	  .then(collected => console.log(collected.size))
	  .catch(collected => console.log(`catch condition: collected ${collected.size}`));
});

client.login(token);
