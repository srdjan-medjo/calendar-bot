import { SlackCommandMiddlewareArgs, App } from '@slack/bolt';
import { slackToken } from '../../config/vars';
import {
  getStats,
  getUsers,
  getUserById,
} from '../../services/calendar/absences';
import { absenceIds } from '../../utils/constants';
import blocksFactory from '../../views/blocksViews/blocksFactory';
import { religiousBlock } from '../../views/blocksViews/blocksData';
import { KCControllerData } from './types';

export default async (
  app: App,
  ctxUserId: string
): Promise<KCControllerData> => {
  // fetch necessary stuff
  const userInfo: any = await app.client.users.info({
    token: slackToken,
    user: ctxUserId,
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
  const totalReligiousDays = 4;
  const leftReligiousDays = user.religiousDaysLeft;

  const religiousDays = religiousBlock(totalReligiousDays, leftReligiousDays);

  return {
    religiousDays,
  };
};
