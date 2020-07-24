interface KCBlocksValues {
  header: string;
  icon: string;
  text: string;
}
export const helpBlock = (): KCBlocksValues => ({
  header: 'Help',
  icon: ':sos:',
  text:
    '*Stats:* `/kc stats`\n' +
    '*Vacation days data:* `/kc vacation`\n' +
    '*Religious days left:* `/kc religious_days`\n' +
    '*WFH data:* `/kc wfh`\n',
});

export const vacationBlock = (
  totalVacationDays: number,
  usedVacationDays: number,
  leftVacationDays: number
): KCBlocksValues => ({
  header: 'Vacation',
  icon: ':beach_with_umbrella:',
  text: `From *${totalVacationDays}* total vacation days, you have used *${usedVacationDays}* days and have *${leftVacationDays}* days left.`,
});

export const religiousBlock = (
  totalReligiousDays: number,
  leftReligiousDays: number
): KCBlocksValues => ({
  header: `Religious Days`,
  icon: `:synagogue: :mosque: :church:`,
  text: `From *${totalReligiousDays}* religious days for this year, you now have *${leftReligiousDays}* days left.`,
});

export const wfhBlock = (
  wfhCurrentMonth: number,
  wfhAverage: number
): KCBlocksValues => ({
  header: `Work From Home`,
  icon: `:computer:`,
  text: `You have used *${wfhCurrentMonth}* WFH days in this month. \n On average you use *${wfhAverage}* WFH days per month.`,
});
