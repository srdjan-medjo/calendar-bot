import { SlashCommand, SayFn } from '@slack/bolt';
import { getUserIdentity } from '../../services/slack/identity';
import { slackToken } from '../../config/vars';

export default async (
  subCommand: string,
  command: SlashCommand,
  say: SayFn
): Promise<void> => {
  await say(`from ${subCommand}`);

  const token = 'xxxx-xxxxxxxxx-xxxx';
  const { data } = await getUserIdentity({ slackToken });
  console.log('data', data);
};
