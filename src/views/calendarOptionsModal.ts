import { selectOptions } from '../utils/helpers';
import { subCommands } from '../listeners/commands';

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
        text:
          'Please select calendar action you want to perform and press Submit',
      },
    },
    {
      type: 'actions',
      elements: [
        {
          type: 'static_select',
          action_id: 'select_calendar_action',
          placeholder: {
            type: 'plain_text',
            text: 'Select an item',
          },

          options: selectOptions(subCommands).map(item => ({
            text: {
              type: 'plain_text',
              text: item.label,
            },
            value: item.value,
          })),
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
    text: 'Submit',
  },
  // private_metadata: 'Shhhhhhhh',
  callback_id: 'submit_calendar_modal',
});
