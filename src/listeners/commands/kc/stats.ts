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
    year: new Date().getFullYear(),
  });

  console.log('stats', stats);
  const totalVacationDays = user.lastYearDays + user.currentYearDays;
  const usedVacationDays = stats.statistics.find(
    (item: any) => item.absenceTypeId === absenceIds.VACATION
  ).activeDays;
  const leftVacationDays = user.currentYearDaysLeft + user.lastYearDaysLeft;
  // calculate days for showing
  const totalReligiousDays = '4';
  const leftReligiousDays = user.religiousDaysLeft;
  const wfhData = stats.statistics.find(
    (item: any) => item.absenceTypeId === absenceIds.WORK_FROM_HOME
  );
  const wfhCurrentMonth = wfhData?.activeDaysCurrentMonth || 0;
  const wfhAverage = wfhData?.averagePerMonth || 0;

  // post result to slack as ephemeral msg
  const result = await app.client.chat.postEphemeral({
    token: slackToken,
    channel: command.channel_id,
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '*CalBot :: Stats* :date:',
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
      {
        type: 'divider',
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `You have used *${wfhCurrentMonth}* WFH days in this month. \n On average you use *${wfhAverage}* WFH days per month.`,
        },
      },
      {
        type: 'divider',
      },
    ],
    text: `stats here`,
    user: command.user_id,
  });

  console.log('result', result);
};
