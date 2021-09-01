import Discord from 'discord.js';
import Bot from './Bot';

const client = new Discord.Client({ intents: ['GUILD_VOICE_STATES', 'GUILD_MESSAGES', 'GUILDS'] });

const bot = new Bot(client);