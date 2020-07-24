export const statsBlocks = (vacation: any, religiousDays: any, wfh: any) => [
  {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: '*CalBot :: Stats* :date:',
    },
  },
  {
    type: 'divider',
  },
  {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: vacation.text,
    },
  },
  {
    type: 'divider',
  },
  {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: religiousDays.text,
    },
  },
  {
    type: 'divider',
  },
  {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: wfh.text,
    },
  },
  {
    type: 'divider',
  },
];
