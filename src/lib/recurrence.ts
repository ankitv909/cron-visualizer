export type RecurrencePattern = 'Daily' | 'Weekly' | 'Monthly';

export function formatOrdinal(day: number): string {
  const value = Math.min(31, Math.max(1, Math.trunc(day)));
  const mod100 = value % 100;

  if (mod100 >= 11 && mod100 <= 13) {
    return `${value}th`;
  }

  switch (value % 10) {
    case 1:
      return `${value}st`;
    case 2:
      return `${value}nd`;
    case 3:
      return `${value}rd`;
    default:
      return `${value}th`;
  }
}

export function clampDayOfMonth(value: string): string {
  const parsed = Number.parseInt(value, 10);

  if (Number.isNaN(parsed)) {
    return '1';
  }

  return String(Math.min(31, Math.max(1, parsed)));
}

export function formatTime(time: string): string {
  const [hour = '00', minute = '00'] = time.split(':');
  return `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`;
}
