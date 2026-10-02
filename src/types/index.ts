export type UserRole = 'student' | 'moderator' | 'admin' | 'super_admin';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  avatarUrl?: string;
  department: string;
  semester: number;
  regulation: string;
  graduationYear?: number;
  college?: string;
  interests: string[];
  skills: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Department {
  id: string; // 'cse', 'it', 'ece', etc.
  code: string;
  name: string;
  description: string;
  icon: string;
  subjectsCount?: number;
}

export interface Regulation {
  id: string; // '2021', '2025'
  year: number;
  name: string;
  isActive: boolean;
  description: string;
}

export interface SubjectUnit {
  id: string;
  subjectId: string;
  unitNumber: number;
  title: string;
  description: string;
  topics: string[];
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  departmentId: string;
  semester: number;
  regulation: string;
  credits: number;
  description: string;
  syllabusOverview?: string;
  units?: SubjectUnit[];
  resourcesCount?: {
    notes: number;
    questionPapers: number;
    importantQuestions: number;
    lab: number;
  };
}

export type ResourceType =
  | 'notes'
  | 'question_paper'
  | 'important_questions'
  | 'syllabus'
  | 'lab'
  | 'question_bank';

export type ResourceStatus = 'published' | 'pending' | 'rejected' | 'archived';

export interface AcademicResource {
  id: string;
  title: string;
  description: string;
  subjectId: string;
  subjectCode: string;
  subjectName: string;
  departmentId: string;
  semester: number;
  regulation: string;
  unitNumber?: number;
  resourceType: ResourceType;
  s3Key: string;
  fileName: string;
  fileSize: string;
  fileType: string;
  isVerified: boolean;
  isOfficial: boolean;
  status: ResourceStatus;
  downloadsCount: number;
  viewsCount: number;
  uploadedAt: string;
  uploaderName?: string;
  previewUrl?: string;
}

export interface QuestionPaperResource extends AcademicResource {
  year: number;
  examSession: 'April/May' | 'Nov/Dec';
  examType: string;
}

export interface ImportantQuestion {
  id: string;
  subjectId: string;
  subjectCode: string;
  subjectName: string;
  unitNumber: number;
  unitTitle: string;
  questionText: string;
  marks: 2 | 13 | 15 | 16;
  category: 'Important' | 'Frequently Asked' | 'Unit-wise' | 'Exam Focus';
  appearanceYears: string[]; // verified historical sessions
  answerNotes?: string;
  keyPoints?: string[];
  isVerified: boolean;
}

export interface QuestionBankItem {
  id: string;
  subjectId: string;
  unitNumber: number;
  type: '2_mark' | '13_mark' | '15_mark' | 'mcq';
  question: string;
  answerSummary?: string;
  options?: string[]; // for MCQ
  correctOptionIndex?: number;
  sourceExamYear?: string;
}

export type OpportunityType = 'internship' | 'job';
export type WorkMode = 'remote' | 'on-site' | 'hybrid';
export type OpportunityStatus = 'draft' | 'published' | 'expired' | 'archived';

export interface Opportunity {
  id: string;
  title: string;
  companyName: string;
  companyLogo?: string;
  description: string;
  type: OpportunityType;
  workMode: WorkMode;
  location: string;
  stipendOrSalary: string;
  duration?: string;
  eligibility: string[];
  skillsRequired: string[];
  graduationYears: number[];
  deadline: string;
  applyUrl: string;
  isVerified: boolean;
  status: OpportunityStatus;
  clicksCount: number;
  createdAt: string;
}

export interface CompanyPrepGuide {
  id: string;
  name: string;
  logo: string;
  domain: string;
  description: string;
  website: string;
  selectionProcess: {
    round: number;
    title: string;
    description: string;
    duration: string;
  }[];
  codingTopics: string[];
  sampleQuestions: {
    question: string;
    topic: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
  }[];
  interviewTips: string[];
  studentExperiences: {
    studentBatch: string;
    role: string;
    verdict: 'Selected' | 'Offered';
    experienceReview: string;
  }[];
}

export interface Bookmark {
  id: string;
  userId: string;
  itemType: 'resource' | 'question_paper' | 'important_question' | 'opportunity' | 'company';
  itemId: string;
  title: string;
  subtitle?: string;
  badge?: string;
  link: string;
  savedAt: string;
}

export interface NotificationItem {
  id: string;
  userId?: string;
  title: string;
  message: string;
  link?: string;
  type: 'academic' | 'opportunity' | 'system' | 'reminder';
  isRead: boolean;
  createdAt: string;
}

export interface StudentSubmission {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  title: string;
  department: string;
  semester: number;
  subjectCode: string;
  resourceType: ResourceType;
  description: string;
  fileName: string;
  fileSize: string;
  status: 'pending' | 'approved' | 'rejected' | 'changes_requested';
  submittedAt: string;
  reviewerNotes?: string;
}

export interface IssueReport {
  id: string;
  reporterEmail?: string;
  resourceTitle: string;
  resourceId?: string;
  opportunityTitle?: string;
  reportType: 'broken_link' | 'wrong_file' | 'incorrect_information' | 'copyright_concern' | 'expired_opportunity' | 'spam';
  description: string;
  status: 'open' | 'investigating' | 'resolved' | 'rejected';
  createdAt: string;
}

export type StudyProgressStatus = 'not_started' | 'studying' | 'completed';

export interface StudyProgressRecord {
  subjectId: string;
  unitNumber: number;
  status: StudyProgressStatus;
  updatedAt: string;
}
