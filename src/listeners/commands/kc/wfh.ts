import { SlackCommandMiddlewareArgs, App } from '@slack/bolt';
import { slackToken } from '../../../config/vars';
import {
  getStats,
  getUsers,
  getUserById,
} from '../../../services/calendar/absences';
import { absenceIds } from '../../../utils/constants';
import blocksFactory from '../../../views/blocksViews/blocksFactory';
import { wfhBlock } from '../../../views/blocksViews/blocksData';
import wfhController from '../../../controllers/kc/wfh';

export default async (
  app: App,
  ctx: SlackCommandMiddlewareArgs
): Promise<void> => {
  const { command } = ctx;
  const { wfh } = await wfhController(app, command.user_id);

  // post result to slack as ephemeral msg
  const result = await app.client.chat.postEphemeral({
    token: slackToken,
    channel: command.channel_id,
    blocks: blocksFactory(wfh.header, wfh.icon, wfh.text),
    text: `kc wfh`,
    user: command.user_id,
  });

  console.log('result', result);
};
