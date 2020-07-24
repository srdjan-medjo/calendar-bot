import { SlackCommandMiddlewareArgs, App } from '@slack/bolt';
import { slackToken } from '../../../config/vars';
import blocksFactory from '../../../views/blocksViews/blocksFactory';
import { helpBlock } from '../../../views/blocksViews/blocksData';

export default async (
  app: App,
  ctx: SlackCommandMiddlewareArgs
): Promise<void> => {
  const { command } = ctx;
  const help = helpBlock();

  try {
    await app.client.chat.postEphemeral({
      token: slackToken,
      channel: command.channel_id,
      blocks: blocksFactory(help.header, help.icon, help.text),
      text: 'kc help',
      user: command.user_id,
    });
  } catch (error) {
    console.log('error', error);
  }
};
