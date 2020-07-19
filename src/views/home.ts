export default (userId: string): any => ({
  type: 'home',
  blocks: [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '*Welcome home, <@' + userId + '> :house:*',
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text:
          'Learn how home tabs can be more useful and interactive <https://api.slack.com/surfaces/tabs/using|*in the documentation*>.',
      },
    },
    {
      type: 'divider',
    },
    {
      type: 'context',
      elements: [
        {
          type: 'mrkdwn',
          text:
            'Psssst this home tab was designed using <https://api.slack.com/tools/block-kit-builder|*Block Kit Builder*>',
        },
      ],
    },
  ],
});
