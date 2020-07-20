import { App } from '@slack/bolt';
import openStatsModal from './openStatsModal';
import showCalendarOptions from './showCalendarOptions';

export default (app: App): void => {
  // openStatsModal(app);
  showCalendarOptions(app);
};
