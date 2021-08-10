const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.once('ready', () => {
	console.log('Ready!');
});

client.on('messageCreate', async m => {
	let channel = m.channel;
	const filter = new_message => new_message.author.id == m.author.id && !new_message.author.bot;
	let collected = await channel.awaitMessages({ filter, max: 1, time: 60000, errors: ['time'] });
	let response = collected.first();
	console.log(`got response ${response}`);
	channel.send(`got your response ${response}`);
});

client.login(token);
