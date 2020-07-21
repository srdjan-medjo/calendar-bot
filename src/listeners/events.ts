import { App } from '@slack/bolt';
import homeView from '../views/homeView/home';

export default (app: App): void => {
  app.event('app_home_opened', async ({ payload, context }) => {
    const userId = payload.user;

    try {
      // Call the views.publish method using the built-in WebClient
      const result = await app.client.views.publish({
        // The token you used to initialize your app is stored in the `context` object
        token: context.botToken,
        user_id: userId,
        view: homeView(userId),
      });

      console.log(result);
    } catch (error) {
      console.error(error);
    }
  });
};
