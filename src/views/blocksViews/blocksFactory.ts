import { KCBlocksFactory } from '../types';

export default (
  header: string,
  icon: string,
  text: string
): KCBlocksFactory[] => {
  return [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*KC :: ${header}* ${icon}`,
      },
    },
    {
      type: 'divider',
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `${text}`,
      },
    },
  ];
};
