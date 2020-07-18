import axios from 'axios';
import https from 'https';
import { resourceUri } from './vars';

const apiAxios = axios.create({
  baseURL: resourceUri,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
    keepAlive: true,
  }),
});

export default apiAxios;
