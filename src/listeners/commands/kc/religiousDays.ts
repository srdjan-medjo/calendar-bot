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
      year: new Date().getFullYear(),
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
            text: '*CalBot :: Religious Days* :synagogue: :mosque: :church: ',
          },
        },
        {
          type: 'divider',
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `From *${totalReligiousDays}* religious days for this year, you now have *${leftReligiousDays}* days left. `,
          },
        },
      ],
      text: 'kc religiousDays',
      user: command.user_id,
    });
  } catch (error) {
    console.log('error', error);
  }
};
