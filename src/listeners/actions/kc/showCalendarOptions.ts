import { App } from '@slack/bolt';
import { app } from '../../../config/bolt';
import calendarView from '../../../views/calendarOptionsModal';
import store from '../../../store';
import { usersActions } from '../../../store/reducers/users';
import { subCommands } from '../../commands/kc';
import stats from '../../commands/kc/stats';
import help from '../../commands/kc/help';
import vacation from '../../commands/kc/vacation';
import info from '../../commands/kc/info';
import religiousDays from '../../commands/kc/religiousDays';

export default (app: App): void => {
  let value = '';
  app.shortcut('calendar', async ({ payload, ack, context }) => {
    ack();

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
    console.log('payload', payload);
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
    console.log(
      'ctx',
      await ctx.client.conversations.list({ token: ctx.context.botToken }),
      app
    );
    // ctx.client.channels.list()
    // ctx.client.im.list()
    try {
      // show ephemeral msg
      // await app.client.chat.postEphemeral({
      //   token: ctx.botToken,
      //   channel: command.channel_id,
      //   blocks: [
      //     {
      //       type: 'section',
      //       text: {
      //         type: 'mrkdwn',
      //         text: '*CalBot :: Vacation*',
      //       },
      //     },
      //     {
      //       type: 'divider',
      //     },
      //     {
      //       type: 'section',
      //       text: {
      //         type: 'mrkdwn',
      //         text: `From *${totalVacationDays}* total vacation days, you have used *${usedVacationDays}* days and have *${leftVacationDays}* days left`,
      //       },
      //     },
      //   ],
      //   text: 'kc vacation',
      //   user: command.user_id,
      // });
    } catch (error) {
      console.error(error);
    }
  });
};
