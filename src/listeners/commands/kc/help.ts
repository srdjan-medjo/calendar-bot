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
            text: '*CalBot :: Help* :sos:',
          },
        },
        {
          type: 'divider',
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text:
              '*Stats:*`/kc stats`\n' +
              '*Vacation days data:* `/kc vacation`\n' +
              '*Religious days left:* `/kc religiousDays`\n' +
              '*WFH data:* `/kc wfh`\n',
            // '*Days of vacation left:* `/kc days_left`\n' +
            // '*Next planned vacation:* `/kc next_vacation`\n',
          },
        },
      ],
      text: 'kc help',
      user: command.user_id,
    });
  } catch (error) {
    console.log('error', error);
  }
};
