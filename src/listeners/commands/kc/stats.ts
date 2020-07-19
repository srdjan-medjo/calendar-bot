import { SlackCommandMiddlewareArgs, App } from '@slack/bolt';
import { slackToken } from '../../../config/vars';
import store from '../../../store';
import { usersActions } from '../../../store/reducers/users';
import {
  getStats,
  getUsers,
  getUserById,
} from '../../../services/calendar/absences';

export default async (
  app: App,
  ctx: SlackCommandMiddlewareArgs
): Promise<void> => {
  const { command } = ctx;

  const userInfo: any = await app.client.users.info({
    token: slackToken,
    user: command.user_id,
  });

  const userEmail = userInfo.user.profile.email;

  //get all users from cal api (which will be based on scope)
  // so we can pull userId
  const { data: users } = await getUsers(userEmail, {});
  const userId = users.find((user: any) => user.email === userEmail).id;

  const { data: user } = await getUserById(userEmail, userId, {});
  console.log('user', user);

  // use userId to get stats
  const { data: stats } = await getStats(userEmail, {
    userId: userId,
    year: 2020,
  });

  console.log('stats', stats);

  // post result to slack as ephemeral msg
  const result = await app.client.chat.postEphemeral({
    token: slackToken,
    channel: command.channel_id,
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `
                Vacation: ${stats.statistics[3].activeDays}
                `,
        },
      },
    ],
    text: `stats here`,
    user: command.user_id,
  });

  console.log('result', result);
};

// total: lastYearDays + currentYearDays
// used:10 used = active days for absence type 1
//18 left = current year left + last year left
