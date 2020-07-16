import { App } from '@slack/bolt';

export default (app: App): void => {
  app.event('app_home_opened', async ({ event, context }) => {
    try {
      /* view.publish is the method that your app uses to push a view to the Home tab */
      const result = await app.client.views.publish({
        /* retrieves your xoxb token from context */
        token: context.botToken,

        /* the user that opened your app's app home */
        user_id: event.user,

        /* the view payload that appears in the app home*/
        view: {
          type: 'home',
          callback_id: 'home_view',

          /* body of the view */
          blocks: [
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: "*Welcome to your _App's Home_* :tada:",
              },
            },
            {
              type: 'divider',
            },
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text:
                  "This button won't do much for now but you can set up a listener for it using the `actions()` method and passing its unique `action_id`. See an example in the `examples` folder within your Bolt app.",
              },
            },
            {
              type: 'actions',
              elements: [
                {
                  type: 'button',
                  text: {
                    type: 'plain_text',
                    text: 'Click me!',
                  },
                },
              ],
            },
          ],
        },
      });
    } catch (error) {
      console.error(error);
    }
  });
};
