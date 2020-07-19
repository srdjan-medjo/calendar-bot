import { SlackCommandMiddlewareArgs, App } from '@slack/bolt';
import { slackToken } from '../../../config/vars';
import {
  getStats,
  getUsers,
  getUserById,
} from '../../../services/calendar/absences';
import { absenceIds } from '../../../utils/constants';

export default async (
  app: App,
  ctx: SlackCommandMiddlewareArgs
): Promise<void> => {
  const { command } = ctx;

  try {
    // fetch necessary stuff
    const userInfo: any = await app.client.users.info({
      token: slackToken,
      user: command.user_id,
    });
    const userEmail = userInfo.user.profile.email;

    const { data: users } = await getUsers(userEmail, {});
    const userId = users.find((user: any) => user.email === userEmail).id;

    const { data: user } = await getUserById(userEmail, userId, {});
    console.log('user', user);

    const { data: stats } = await getStats(userEmail, {
      userId: userId,
      year: 2020,
    });
    console.log('stats', stats);

    // calculate days for showing
    const totalReligiousDays = '4';
    const leftReligiousDays = user.religiousDaysLeft;

    // show ephemeral msg
    await app.client.chat.postEphemeral({
      token: slackToken,
      channel: command.channel_id,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: '*CalBot :: Religious Days*',
          },
        },
        {
          type: 'divider',
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `From *${totalReligiousDays}* days total for this year, you now have *${leftReligiousDays}* days left. `,
          },
        },
        {
          type: 'context',
          elements: [
            {
              type: 'mrkdwn',
              text: `Keep in mind first 2 days are free, for other 2 you need to use your vacation`,
            },
          ],
        },
      ],
      text: 'kc vacation',
      user: command.user_id,
    });
  } catch (error) {
    console.log('error', error);
  }
};
