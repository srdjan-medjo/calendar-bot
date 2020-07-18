import axios from 'axios';
import https from 'https';
import { resourceUri, slackUri } from './vars';

export const calendarApi = axios.create({
  baseURL: resourceUri,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
    keepAlive: true,
  }),
});

export const slackApi = axios.create({
  baseURL: slackUri,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
    keepAlive: true,
  }),
});
