import { Client } from 'discord.js';
import * as dotenv from 'dotenv';

dotenv.config();
 
export default class Bot {
  readonly client: Client;

  public constructor(client: Client) {
    this.client = client;

    this.client.on('ready', () => console.log('Faça a mágica'));
    this.client.login(process.env.BOT_TOKEN);
  }
}