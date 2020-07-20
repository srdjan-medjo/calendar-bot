import { App } from '@slack/bolt';
import kc from './kc';

export default (app: App): void => {
  kc(app);
};
