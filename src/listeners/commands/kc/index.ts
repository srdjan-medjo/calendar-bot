import { App } from '@slack/bolt';
import stats from './stats';
import help from './help';
import vacation from './vacation';
import religiousDays from './religiousDays';
import { slackToken } from '../../../config/vars';
import wfh from './wfh';
import blocksFactory from '../../../views/blocksViews/blocksFactory';
import textFactory from '../../../views/textFactory';

export interface KCSubCommands {
  [char: string]: any;
}

export const subCommands: KCSubCommands = {
  stats,
  help,
  vacation,
  religious_days: religiousDays,
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
        blocks: blocksFactory(
          'Not Found',
          ':no_entry_sign:',
          'That command does not exist, please try with `/kc help`'
        ),
        text: textFactory("That command doesn't exist"),
        user: command.user_id,
      });
  });
};
