// import { app } from '../config/bolt';

import { App } from '@slack/bolt';

export default (app: App): void => {
  app.message('hello', async ({ message, say }) => {
    console.log('message', message);
    await say(`Hey there <@${message.user}>!`);
  });

  app.message('echo', async ({ message, say }) => {
    console.log('message', message);
    await say(message.text || '');
  });
};
