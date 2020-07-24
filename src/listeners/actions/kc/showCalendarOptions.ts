import { App } from '@slack/bolt';
import { app } from '../../../config/bolt';
import calendarView from '../../../views/modalViews/calendarOptionsModal';
import store from '../../../store';
import { usersActions } from '../../../store/reducers/users';
import { subCommands } from '../../commands/kc';
import stats from '../../commands/kc/stats';
import help from '../../commands/kc/help';
import vacation from '../../commands/kc/vacation';
import religiousDays from '../../commands/kc/religiousDays';
import wfh from '../../commands/kc/wfh';
import blocksFactory from '../../../views/blocksViews/blocksFactory';
import { KCSubCommands } from '../../commands/kc/index';
import {
  wfhBlock,
  vacationBlock,
  religiousBlock,
  helpBlock,
} from '../../../views/blocksViews/blocksData';
import wfhController from '../../../controllers/kc/wfh';
import religiousDaysController from '../../../controllers/kc/religiousDays';
import vacationController from '../../../controllers/kc/vacation';
import { statsBlocks } from '../../../views/blocksViews/statsBlocks';
import { capitalize } from '../../../utils/helpers';
import textFactory from '../../../views/textFactory';

export default (app: App): void => {
  let value = '';
  let userId = '';

  app.shortcut('calendar', async ({ payload, ack, context }) => {
    ack();

    userId = payload.user.id;
    try {
      const result = await app.client.views.open({
        token: context.botToken,
        trigger_id: payload.trigger_id,
        view: calendarView(),
      });
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  });

  app.action('select_calendar_action', async ({ payload, ack, context }) => {
    ack();

    const payload2: any = payload;
    try {
      value = payload2.selected_option.value;
    } catch (error) {
      console.error(error);
    }
  });

  app.view('submit_calendar_modal', async ctx => {
    const { ack } = ctx;
    ack();
    console.log('value', value);

    const { vacation } = await vacationController(app, ctx.body.user.id);
    const { wfh } = await wfhController(app, ctx.body.user.id);
    const { religiousDays } = await religiousDaysController(
      app,
      ctx.body.user.id
    );

    const selectOptions: KCSubCommands = {
      stats: statsBlocks(vacation, religiousDays, wfh),
      vacation: blocksFactory(vacation.header, vacation.icon, vacation.text),
      religious_days: blocksFactory(
        religiousDays.header,
        religiousDays.icon,
        religiousDays.text
      ),
      wfh: blocksFactory(wfh.header, wfh.icon, wfh.text),
    };

    try {
      await app.client.chat.postEphemeral({
        token: ctx.context.botToken,
        channel: userId,
        blocks: selectOptions[value],
        text: textFactory(capitalize(value)),
        user: userId,
      });
    } catch (error) {
      console.error(error);
    }
  });
};
