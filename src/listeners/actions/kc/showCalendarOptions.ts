import { App } from '@slack/bolt';
import { app } from '../../../config/bolt';
import calendarView from '../../../views/calendarOptionsModal';

export default (app: App): void => {
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
};
