export default (userId: string): any => ({
  type: 'home',
  blocks: [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text:
          '*Hi there <@' + userId + '> :wave: Welcome to CalBot :calendar:*',
      },
    },
    {
      type: 'divider',
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text:
          'Great to see you here! CalBot helps you check your *<https://calendar.klika.ba/|Klika Calendar>* data right here within Slack. You will be able to check the following data using this commands: ',
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text:
          '• */kc stats* - Check all your data aggregated \n • */kc vacation* - Check your vacation data\n • */kc religiousDays* - Check your religious days data \n • */kc wfhDays* - Check your WFH data \n • */kc help* - Get help with the commands',
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: "Don't forget to update your calendar and enjoy using CalBot!",
      },
    },
  ],
});
