
export interface AuditQuestion {
  id: string;
  question: string;
  category: string;
  required: boolean;
  options?: string[];
  answerType: 'text' | 'radio' | 'checkbox' | 'dropdown' | 'rating';
  createdAt: Date;
  createdBy: string;
  isActive: boolean;
}

export interface AuditQuestionCategory {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  isActive: boolean;
}

export interface AuditAnswer {
  id: string;
  questionId: string;
  answer: string;
  auditId: string;
  createdAt: Date;
  createdBy: string;
}

export interface AuditQuestionnaire {
  id: string;
  title: string;
  description: string;
  questions: AuditQuestion[];
  createdAt: Date;
  createdBy: string;
  isActive: boolean;
}
