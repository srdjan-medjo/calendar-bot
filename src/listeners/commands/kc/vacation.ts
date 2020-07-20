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
    const totalVacationDays = user.lastYearDays + user.currentYearDays;
    const usedVacationDays = stats.statistics.find(
      (item: any) => item.absenceTypeId === absenceIds.VACATION
    ).activeDays;
    const leftVacationDays = user.currentYearDaysLeft + user.lastYearDaysLeft;

    // show ephemeral msg
    await app.client.chat.postEphemeral({
      token: slackToken,
      channel: command.channel_id,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: '*CalBot :: Vacation* :beach_with_umbrella:',
          },
        },
        {
          type: 'divider',
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `From *${totalVacationDays}* total vacation days, you have used *${usedVacationDays}* days and have *${leftVacationDays}* days left.`,
          },
        },
      ],
      text: 'kc vacation',
      user: command.user_id,
    });
  } catch (error) {
    console.log('error', error);
  }
};
