export enum CaseStatus {
  NEW = 'new',
  OPEN = 'open',
  IN_PROGRESS = 'in progress',
  CLOSED = 'closed',
}

export enum CasePriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export interface Case {
  id: number;
  dateTimeOpened: string; // ISO date string when receiving from API
  dateTimeClosed: string | null; // ISO date string or null
  status: CaseStatus;
  priority: CasePriority;
  subject: string;
}

// Helper for creating a new case
export interface CreateCaseDto {
  subject: string;
  status?: CaseStatus;
  priority?: CasePriority;
  dateTimeOpened?: string; // ISO date string
  dateTimeClosed?: string | null; // ISO date string or null
}

// Helper for updating a case
export interface UpdateCaseDto {
  subject?: string;
  status?: CaseStatus;
  priority?: CasePriority;
  dateTimeClosed?: string | null; // ISO date string or null
}
