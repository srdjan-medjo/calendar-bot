import { SlashCommand, SayFn } from '@slack/bolt';

export default async (
  subCommand: string,
  command: SlashCommand,
  say: SayFn
): Promise<void> => {
  await say(`from ${subCommand}`);
};
