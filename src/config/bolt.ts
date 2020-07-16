import { App } from '@slack/bolt';
import { slackSecret, slackToken } from '../config/vars';

// Initialize bolt app
export const app = new App({
  token: slackToken,
  signingSecret: slackSecret,
});
