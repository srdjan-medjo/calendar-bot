import { calendarApi } from '../../config/axios';

export const getStats = (email: string, params: any): Promise<any> =>
  calendarApi.get(`/api/v1/statistics`, {
    headers: { 'X-Klika-Mail': email },
    params,
  });

export const getUsers = (email: string, params: any): Promise<any> =>
  calendarApi.get(`/api/v1/users`, {
    headers: { 'X-Klika-Mail': email },
    params,
  });
