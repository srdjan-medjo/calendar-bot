import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

export const slackSecret = process.env.SLACK_SIGNING_SECRET as string;
export const slackToken = process.env.SLACK_BOT_TOKEN as string;
export const resourceUri = process.env.RESOURCE_URI as string;
export const port = (process.env.PORT || '3000') as string;
