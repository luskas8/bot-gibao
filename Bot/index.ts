import Discord, { Client, Collection } from 'discord.js';
import fs from 'fs';
import path from 'path';
import * as dotenv from 'dotenv';
import { Commands } from './types';

dotenv.config();
 
export default class Bot {
  readonly client = new Discord.Client({ intents: ['GUILD_VOICE_STATES', 'GUILD_MESSAGES', 'GUILDS'] });
  readonly commandsCollection = new Discord.Collection<String, Commands>();

  public constructor() {
    this.client.on('ready', () => console.log('Faça a mágica'));
    this.client.login(process.env.BOT_TOKEN);

    const commandsFiles = fs.readdirSync(path.join(__dirname, 'commands/')).filter(file => file.endsWith('.ts'));

    for (let file of commandsFiles) {
      let command = require(`./commands/${file}`) as Commands;

      this.commandsCollection.set(command.name, command);
    }

    this.client.on('messageCreate', async message => {
      if (!message.content.startsWith(process.env.PREFIX!) || message.author.bot) return;

      // argumentos do comando caso o comando suporte
      const args = message.content.slice(process.env.PREFIX!.length).split(/ +/);
      
      // comando desejado
      const command = args.shift()!.toLocaleLowerCase();

      this.commandsCollection.get(command)!.execute(message, args);
    });
  }
}