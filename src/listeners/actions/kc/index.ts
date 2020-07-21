import { App } from '@slack/bolt';
import showCalendarOptions from './showCalendarOptions';

export default (app: App): void => {
  showCalendarOptions(app);
};
