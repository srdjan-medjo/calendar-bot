export default (): any => ({
  type: 'modal',
  title: {
    type: 'plain_text',
    text: 'Calendar',
  },
  blocks: [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: 'Vacation',
      },
      accessory: {
        type: 'button',
        text: {
          type: 'plain_text',
          text: 'Open',
          emoji: true,
        },
        value: 'vacation',
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: 'Religious Days',
      },
      accessory: {
        type: 'button',
        text: {
          type: 'plain_text',
          text: 'Open',
          emoji: true,
        },
        value: 'religious_days',
      },
    },
  ],
  close: {
    type: 'plain_text',
    text: 'Cancel',
  },
  // submit: {
  //   type: 'plain_text',
  //   text: 'Save',
  // },
  private_metadata: 'Shhhhhhhh',
  callback_id: 'calendar_id',
});
