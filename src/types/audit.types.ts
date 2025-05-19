
export interface AuditQuestion {
  id: string;
  question: string;
  category: string;
  required: boolean;
  answerType: "text" | "checkbox" | "radio" | "rating" | "dropdown";
  options?: string[];
  createdAt: Date;
  createdBy: string;
  isActive: boolean;
}

export interface AuditAnswer {
  questionId: string;
  answer: string | string[] | number;
  comments?: string;
}

export interface AuditReport {
  id: string;
  cspId: string;
  auditorId: string;
  date: string;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  answers: AuditAnswer[];
  photos?: string[];
  signature?: string;
  overallRating?: number;
}
