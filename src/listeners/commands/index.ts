import { App } from '@slack/bolt';
import login from './login';
import stats from './absences';
import { slackToken } from '../../config/vars';

interface KCSubCommands {
  [char: string]: any;
}

export default (app: App): void => {
  app.command('/kc', async ctx => {
    const { ack, command } = ctx;
    await ack();

    const subCommands: KCSubCommands = {
      login,
      stats,
    };

    const separatorIndex = command.text.indexOf(' ');
    let subCommand: string;

    if (separatorIndex !== -1)
      subCommand = command.text.substring(0, separatorIndex);
    else subCommand = command.text;

    if (subCommands[subCommand]) await subCommands[subCommand](app, ctx);
    else
      await app.client.chat.postEphemeral({
        token: slackToken,
        channel: command.channel_id,
        text: "That command doesn't exist",
        user: command.user_id,
      });
  });
};
