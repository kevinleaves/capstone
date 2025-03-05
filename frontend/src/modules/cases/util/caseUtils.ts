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
