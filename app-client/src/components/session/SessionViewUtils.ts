export const dateTimePair = (start: Date, end: Date) =>
  `${start.toLocaleTimeString()} - ${end.toLocaleTimeString()}`;
