export const CRON_FIELD_LABELS = [
  'Seconds',
  'Minutes',
  'Hours',
  'Day of Month',
  'Month',
  'Day of Week',
] as const;

export const EMPTY_CRON_FIELDS = ['*', '*', '*', '*', '*', '*'] as const;

export type CronParseResult = {
  expression: string;
  fields: string[];
  error: string;
};

const SIMPLE_SEGMENT = /^(?:\*|\d+|\d+-\d+)(?:\/\d+)?$/;

function isSupportedField(value: string): boolean {
  return value.split(',').every((segment) => SIMPLE_SEGMENT.test(segment));
}

/**
 * Parse the six-field cron format used by the visualizer.
 *
 * Besides plain values and wildcards, the parser accepts common list, range,
 * and step forms such as `1,15,30`, `1-5`, an asterisk with a step value
 * (for example, every 10 units), and `1-5/2`.
 */
export function parseCronExpression(rawValue: string): CronParseResult {
  let expression = rawValue.trim();

  // Keep the original assignment convenience: "123456" becomes
  // "1 2 3 4 5 6" before parsing.
  if (/^\d{6}$/.test(expression)) {
    expression = expression.split('').join(' ');
  }

  if (!expression) {
    return {
      expression,
      fields: [...EMPTY_CRON_FIELDS],
      error: '',
    };
  }

  const fields = expression.split(/\s+/);

  if (fields.length !== CRON_FIELD_LABELS.length) {
    return {
      expression,
      fields: [...EMPTY_CRON_FIELDS],
      error: 'Cron expression must have exactly 6 fields.',
    };
  }

  const invalidFieldIndex = fields.findIndex((field) => !isSupportedField(field));

  if (invalidFieldIndex >= 0) {
    return {
      expression,
      fields: [...EMPTY_CRON_FIELDS],
      error: `${CRON_FIELD_LABELS[invalidFieldIndex]} contains unsupported cron syntax.`,
    };
  }

  return {
    expression,
    fields,
    error: '',
  };
}
