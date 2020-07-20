import { App } from '@slack/bolt';
import stats from './kc/stats';
import help from './kc/help';
import vacation from './kc/vacation';
import religiousDays from './kc/religiousDays';
import { slackToken } from '../../config/vars';
import wfh from './kc/wfh';

interface KCSubCommands {
  [char: string]: any;
}

export default (app: App): void => {
  app.command('/kc', async ctx => {
    const { ack, command } = ctx;
    ack();

    const subCommands: KCSubCommands = {
      stats,
      help,
      vacation,
      religiousDays,
      wfh,
    };

    const separatorIndex = command.text.indexOf(' ');
    let subCommand: string;

    if (separatorIndex !== -1)
      subCommand = command.text.substring(0, separatorIndex);
    else subCommand = command.text;

    if (subCommands[subCommand]) subCommands[subCommand](app, ctx);
    else
      app.client.chat.postEphemeral({
        token: slackToken,
        channel: command.channel_id,
        text: "That command doesn't exist",
        user: command.user_id,
      });
  });
};
