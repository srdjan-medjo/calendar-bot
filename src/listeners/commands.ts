import { App } from '@slack/bolt';

export default (app: App): void => {
  app.command('/echo', async ({ command, ack, say }) => {
    await ack();
    console.log('command', command);
    await say(`${command.text}`);
  });
  app.command('/kc', async ({ command, ack, say }) => {
    await ack();
    console.log('command', command);
    await say(`KC commands will be here`);
  });
};
