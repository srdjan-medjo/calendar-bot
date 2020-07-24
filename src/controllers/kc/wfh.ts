import { SlackCommandMiddlewareArgs, App } from '@slack/bolt';
import { slackToken } from '../../config/vars';
import {
  getStats,
  getUsers,
  getUserById,
} from '../../services/calendar/absences';
import { absenceIds } from '../../utils/constants';
import blocksFactory from '../../views/blocksViews/blocksFactory';
import { wfhBlock } from '../../views/blocksViews/blocksData';
import { KCControllerData } from './types';

export default async (
  app: App,
  ctxUserId: string
): Promise<KCControllerData> => {
  const userInfo: any = await app.client.users.info({
    token: slackToken,
    user: ctxUserId,
  });
  console.log('userInfo', userInfo);

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
  const wfhData = stats.statistics.find(
    (item: any) => item.absenceTypeId === absenceIds.WORK_FROM_HOME
  );
  const wfhCurrentMonth = wfhData?.activeDaysCurrentMonth || 0;
  const wfhAverage = wfhData?.averagePerMonth || 0;

  const wfh = wfhBlock(wfhCurrentMonth, wfhAverage);

  return {
    wfh,
  };
};
