import { slackApi } from '../../config/axios';

type AxiosParams = any;

export const postEphemeral = (params: any): Promise<any> =>
  slackApi.get(`/chat.postEphemeral`, { params });
