import { slackApi } from '../../config/axios';

type AxiosParams = any;

export const getUserIdentity = (params?: AxiosParams): Promise<any> =>
  slackApi.get(`/users.identity`, { params });
