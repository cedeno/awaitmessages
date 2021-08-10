const { Client, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.once('ready', () => {
	console.log('Ready!');
});

client.on('messageCreate', m => {
	console.log("got message '%s'", m);
	let channel = m.channel;

	// code from https://discord.js.org/#/docs/main/stable/class/TextChannel?scrollTo=awaitMessages
	const filter = m => m.content.startsWith('!vote');
	// Errors: ['time'] treats ending because of the time limit as an error
	channel.awaitMessages({ filter, max: 4, time: 60000, errors: ['time'] })
	  .then(collected => console.log(collected.size))
	  .catch(collected => console.log(`After a minute, only ${collected.size} out of 4 voted.`));
});

client.login('');
