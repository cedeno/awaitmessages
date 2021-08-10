const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.once('ready', () => {
	console.log('Ready!');
});

client.on('messageCreate', async m => {
	if (m.content.startsWith("!delete") && !m.author.bot) {
		let response = await getYesNo(m, "Are you sure? YES NO");
		if (response) {
			// delete stuff
			await m.channel.send(`Starting deleting. Please wait...`);
			await deleteEverything();
			await m.channel.send(`Deletion complete.`);
		}
		else {
			m.channel.send(`Aborting deletion.`);
		}
	}
});

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function deleteEverything() {
	// do stuff
	await timeout(2000);
}

// sends question as a message, waits for a YES or NO response and turns it into a boolean response
// returns true or false (boolean)
async function getYesNo(message, question) {
	let result_message = await message.channel.send(question);
	const filter = new_message => new_message.author.id == message.author.id && !new_message.author.bot;
	let collected = await message.channel.awaitMessages({ filter, max: 1, time: 60000, errors: ['time'] });
	let response = collected.first();
	return response.content == "YES";
}
client.login(token);
