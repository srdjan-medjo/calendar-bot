import { SlackCommandMiddlewareArgs, App } from '@slack/bolt';
import { slackToken } from '../../../config/vars';

export default async (
  app: App,
  ctx: SlackCommandMiddlewareArgs
): Promise<void> => {
  const { command } = ctx;

  try {
    await app.client.chat.postEphemeral({
      token: slackToken,
      channel: command.channel_id,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: '*CalBot :: Help*',
          },
        },
        {
          type: 'divider',
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: 'Please choose info you would like to see:',
          },
        },
        {
          type: 'actions',
          elements: [
            {
              type: 'button',
              action_id: 'vacation',
              text: {
                type: 'plain_text',
                text: 'Vacation',
              },
            },
            {
              type: 'button',
              action_id: 'religious_days',
              text: {
                type: 'plain_text',
                text: 'Religious Days',
              },
            },
          ],
        },
      ],
      text: 'kc help',
      user: command.user_id,
    });
  } catch (error) {
    console.log('error', error);
  }
};
