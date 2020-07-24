import { SlackCommandMiddlewareArgs, App } from '@slack/bolt';
import { slackToken } from '../../../config/vars';
import {
  getStats,
  getUsers,
  getUserById,
} from '../../../services/calendar/absences';
import { absenceIds } from '../../../utils/constants';
import blocksFactory from '../../../views/blocksViews/blocksFactory';
import { vacationBlock } from '../../../views/blocksViews/blocksData';
import vacationController from '../../../controllers/kc/vacation';
import textFactory from '../../../views/textFactory';

export default async (
  app: App,
  ctx: SlackCommandMiddlewareArgs
): Promise<void> => {
  const { command } = ctx;

  try {
    const { vacation } = await vacationController(app, command.user_id);

    // show ephemeral msg
    await app.client.chat.postEphemeral({
      token: slackToken,
      channel: command.channel_id,
      blocks: blocksFactory(vacation.header, vacation.icon, vacation.text),
      text: textFactory('Vacation'),
      user: command.user_id,
    });
  } catch (error) {
    console.log('error', error);
  }
};
