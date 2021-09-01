import { Message } from "discord.js";

module.exports = {
  name: 'ping',
  description: 'A test command, that reply the message with some message.',
  execute(message: Message, args: Array<String>) {
    message.reply('Pong!');
  }
}