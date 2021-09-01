import { Message } from "discord.js";

export interface Commands {
  name: string;
  description: string,
  execute: (message: Message, args: Array<string>) => Promise<void>;
}