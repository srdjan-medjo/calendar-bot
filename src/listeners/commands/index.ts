import { App } from '@slack/bolt';
import stats from './kc/stats';
import help from './kc/help';
import vacation from './kc/vacation';
import info from './kc/info';
import religiousDays from './kc/religiousDays';
import { slackToken } from '../../config/vars';
import wfh from './kc/wfh';

interface KCSubCommands {
  [char: string]: any;
}

export const subCommands: KCSubCommands = {
  stats,
  help,
  vacation,
  religious_days: religiousDays,
  info,
  wfh,
};

export default (app: App): void => {
  app.command('/kc', async ctx => {
    const { ack, command } = ctx;
    ack();

    const separatorIndex = command.text.indexOf(' ');
    let subCommand: string;

    if (separatorIndex !== -1)
      subCommand = command.text.substring(0, separatorIndex);
    else subCommand = command.text;

    console.log('subCommands', subCommands);

    if (subCommands[subCommand]) subCommands[subCommand](app, ctx);
    else
      app.client.chat.postEphemeral({
        token: slackToken,
        channel: command.channel_id,
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: '*CalBot :: Not Found* :no_entry_sign:',
            },
          },
          {
            type: 'divider',
          },
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: 'That command does not exist',
            },
          },
        ],
        text: "That command doesn't exist",
        user: command.user_id,
      });
  });
};
