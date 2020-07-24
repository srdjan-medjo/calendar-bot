import { SlackCommandMiddlewareArgs, App } from '@slack/bolt';
import { slackToken } from '../../../config/vars';
import {
  getStats,
  getUsers,
  getUserById,
} from '../../../services/calendar/absences';
import { absenceIds } from '../../../utils/constants';
import vacationController from '../../../controllers/kc/vacation';
import wfhController from '../../../controllers/kc/wfh';
import religiousDaysController from '../../../controllers/kc/religiousDays';
import { statsBlocks } from '../../../views/blocksViews/statsBlocks';
import textFactory from '../../../views/textFactory';

export default async (
  app: App,
  ctx: SlackCommandMiddlewareArgs
): Promise<void> => {
  const { command } = ctx;

  const { vacation } = await vacationController(app, command.user_id);
  const { religiousDays } = await religiousDaysController(app, command.user_id);
  const { wfh } = await wfhController(app, command.user_id);

  // post result to slack as ephemeral msg
  const result = await app.client.chat.postEphemeral({
    token: slackToken,
    channel: command.channel_id,
    blocks: statsBlocks(vacation, religiousDays, wfh),
    text: textFactory('Stats'),
    user: command.user_id,
  });

  console.log('result', result);
};
