export default (): any => ({
  type: 'modal',
  title: {
    type: 'plain_text',
    text: 'Statistics',
  },
  blocks: [
    {
      type: 'actions',
      elements: [
        {
          type: 'static_select',
          placeholder: {
            type: 'plain_text',
            text: 'Select year',
            emoji: true,
          },
          options: [
            {
              text: {
                type: 'plain_text',
                text: '2020',
                emoji: true,
              },
              value: '2020',
            },
            {
              text: {
                type: 'plain_text',
                text: '2019',
                emoji: true,
              },
              value: '2019',
            },
            {
              text: {
                type: 'plain_text',
                text: '2018',
                emoji: true,
              },
              value: '2018',
            },
          ],
        },
      ],
    },
  ],
  close: {
    type: 'plain_text',
    text: 'Cancel',
  },
  submit: {
    type: 'plain_text',
    text: 'Save',
  },
  private_metadata: 'Shhhhhhhh',
  callback_id: 'view_identifier_12',
});
