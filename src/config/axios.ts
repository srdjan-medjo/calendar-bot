import axios from 'axios';
import https from 'https';

const proxyAxios = axios.create({
  // baseURL: resourceUri,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
    keepAlive: true,
  }),
});

export default proxyAxios;
