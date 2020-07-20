import { App } from '@slack/bolt';
import { app } from '../../../config/bolt';
import statsView from '../../../views/statsModal';

export default (app: App): void => {
  app.shortcut('stats_modal', async ({ payload, ack, context }) => {
    ack();

    try {
      const result = await app.client.views.open({
        token: context.botToken,
        trigger_id: payload.trigger_id,
        view: statsView(),
      });
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  });
};
