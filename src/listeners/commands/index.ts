import { App } from '@slack/bolt';
import login from './login';
import absences from './absences';

interface KCSubCommands {
  [char: string]: any;
}

export default (app: App): void => {
  app.command('/echo', async ({ command, ack, say }) => {
    await ack();
    console.log('command', command);
    await say(`${command.text}`);
  });

  app.command('/kc', async ({ command, ack, say }) => {
    await ack();
    console.log('command', command);

    const subCommands: KCSubCommands = {
      login,
      absences,
    };

    const separatorIndex = command.text.indexOf(' ');
    let subCommand: string;

    if (separatorIndex !== -1)
      subCommand = command.text.substring(0, separatorIndex);
    else subCommand = command.text;

    if (subCommands[subCommand])
      await subCommands[subCommand](subCommand, command, say);
    else await say(`That command does not exist`);
  });
};
