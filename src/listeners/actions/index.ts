import { App } from '@slack/bolt';
import statsView from '../../views/statsModal';
// import statsShortcut from './kc/openStatsModal';
import kc from './kc';

export default (app: App): void => {
  kc(app);
};
