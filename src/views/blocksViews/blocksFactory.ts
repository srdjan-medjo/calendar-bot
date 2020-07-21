interface KCBlocksFactory {
  type: string;
  text?: Record<string, unknown>;
}

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
        text: `*CalBot :: ${header}* ${icon}`,
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
