export function getBadgeVariantForPriority(
  priority: string
): 'default' | 'destructive' | 'outline' | 'secondary' {
  switch (priority) {
    case 'low':
      return 'outline';
    case 'medium':
      return 'secondary';
    case 'high':
      return 'destructive';
    default:
      return 'outline';
  }
}

export function getBadgeVariantForStatus(
  status: string
): 'default' | 'destructive' | 'outline' | 'secondary' {
  switch (status) {
    case 'new':
      return 'secondary';
    case 'open':
      return 'default';
    case 'in progress':
      return 'default';
    case 'closed':
      return 'outline';
    default:
      return 'secondary';
  }
}

/**
 *
 * @param ISOStringDate 2025-03-03T02:34:24.534Z
 * @returns 3/2/2025, 6:34 PM
 */
export function formatTimestring(ISOStringDate?: string) {
  if (!ISOStringDate) return '';

  const date = new Date(ISOStringDate);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  const formmatedDateString = new Intl.DateTimeFormat('en-us', options).format(
    date
  );
  return formmatedDateString;
}
