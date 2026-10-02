import {
  AcademicResource,
  ImportantQuestion,
  Opportunity,
  CompanyPrepGuide,
  StudentSubmission,
  IssueReport,
  NotificationItem,
  Subject,
} from '@/types';
import {
  SUBJECTS,
  MOCK_RESOURCES,
  MOCK_QUESTION_PAPERS,
  MOCK_IMPORTANT_QUESTIONS,
  MOCK_QUESTION_BANK,
  MOCK_OPPORTUNITIES,
  MOCK_COMPANIES,
  MOCK_SUBMISSIONS,
  MOCK_REPORTS,
  MOCK_NOTIFICATIONS,
} from '@/lib/mock-data';

// Local storage keys for persisting client-side changes
const SUBMISSIONS_KEY = 'au_student_hub_submissions';
const REPORTS_KEY = 'au_student_hub_reports';
const RESOURCES_KEY = 'au_student_hub_resources';
const OPPORTUNITIES_KEY = 'au_student_hub_opportunities';

export const dataService = {
  // --- Resources ---
  getAllResources(): AcademicResource[] {
    if (typeof window === 'undefined') return [...MOCK_RESOURCES, ...MOCK_QUESTION_PAPERS];
    try {
      const stored = localStorage.getItem(RESOURCES_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error(e);
    }
    return [...MOCK_RESOURCES, ...MOCK_QUESTION_PAPERS];
  },

  getNotes(): AcademicResource[] {
    return this.getAllResources().filter((r) => r.resourceType === 'notes');
  },

  getQuestionPapers(): AcademicResource[] {
    return this.getAllResources().filter((r) => r.resourceType === 'question_paper');
  },

  getResourceById(id: string): AcademicResource | undefined {
    return this.getAllResources().find((r) => r.id === id);
  },

  saveResource(resource: AcademicResource): void {
    const list = this.getAllResources();
    const index = list.findIndex((r) => r.id === resource.id);
    if (index >= 0) {
      list[index] = resource;
    } else {
      list.unshift(resource);
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem(RESOURCES_KEY, JSON.stringify(list));
    }
  },

  deleteResource(id: string): void {
    const list = this.getAllResources().filter((r) => r.id !== id);
    if (typeof window !== 'undefined') {
      localStorage.setItem(RESOURCES_KEY, JSON.stringify(list));
    }
  },

  incrementDownload(id: string): void {
    const list = this.getAllResources();
    const item = list.find((r) => r.id === id);
    if (item) {
      item.downloadsCount += 1;
      if (typeof window !== 'undefined') {
        localStorage.setItem(RESOURCES_KEY, JSON.stringify(list));
      }
    }
  },

  incrementView(id: string): void {
    const list = this.getAllResources();
    const item = list.find((r) => r.id === id);
    if (item) {
      item.viewsCount += 1;
      if (typeof window !== 'undefined') {
        localStorage.setItem(RESOURCES_KEY, JSON.stringify(list));
      }
    }
  },

  // --- Important Questions & Question Bank ---
  getImportantQuestions(): ImportantQuestion[] {
    return MOCK_IMPORTANT_QUESTIONS;
  },

  getQuestionBank() {
    return MOCK_QUESTION_BANK;
  },

  // --- Opportunities (Internships & Jobs) ---
  getAllOpportunities(): Opportunity[] {
    if (typeof window === 'undefined') return MOCK_OPPORTUNITIES;
    try {
      const stored = localStorage.getItem(OPPORTUNITIES_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error(e);
    }
    return MOCK_OPPORTUNITIES;
  },

  getInternships(): Opportunity[] {
    return this.getAllOpportunities().filter((o) => o.type === 'internship');
  },

  getJobs(): Opportunity[] {
    return this.getAllOpportunities().filter((o) => o.type === 'job');
  },

  saveOpportunity(opportunity: Opportunity): void {
    const list = this.getAllOpportunities();
    const index = list.findIndex((o) => o.id === opportunity.id);
    if (index >= 0) {
      list[index] = opportunity;
    } else {
      list.unshift(opportunity);
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem(OPPORTUNITIES_KEY, JSON.stringify(list));
    }
  },

  deleteOpportunity(id: string): void {
    const list = this.getAllOpportunities().filter((o) => o.id !== id);
    if (typeof window !== 'undefined') {
      localStorage.setItem(OPPORTUNITIES_KEY, JSON.stringify(list));
    }
  },

  incrementOpportunityClick(id: string): void {
    const list = this.getAllOpportunities();
    const item = list.find((o) => o.id === id);
    if (item) {
      item.clicksCount += 1;
      if (typeof window !== 'undefined') {
        localStorage.setItem(OPPORTUNITIES_KEY, JSON.stringify(list));
      }
    }
  },

  // --- Companies ---
  getCompanies(): CompanyPrepGuide[] {
    return MOCK_COMPANIES;
  },

  getCompanyById(id: string): CompanyPrepGuide | undefined {
    return MOCK_COMPANIES.find((c) => c.id === id);
  },

  // --- Student Submissions (Moderation Queue) ---
  getSubmissions(): StudentSubmission[] {
    if (typeof window === 'undefined') return MOCK_SUBMISSIONS;
    try {
      const stored = localStorage.getItem(SUBMISSIONS_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error(e);
    }
    return MOCK_SUBMISSIONS;
  },

  addSubmission(submission: Omit<StudentSubmission, 'id' | 'status' | 'submittedAt'>): StudentSubmission {
    const newSubmission: StudentSubmission = {
      ...submission,
      id: `subm-${Date.now()}`,
      status: 'pending',
      submittedAt: new Date().toISOString(),
    };
    const current = this.getSubmissions();
    const updated = [newSubmission, ...current];
    if (typeof window !== 'undefined') {
      localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(updated));
    }
    return newSubmission;
  },

  updateSubmissionStatus(id: string, status: 'approved' | 'rejected' | 'changes_requested', reviewerNotes?: string): void {
    const current = this.getSubmissions();
    const target = current.find((s) => s.id === id);
    if (target) {
      target.status = status;
      target.reviewerNotes = reviewerNotes;

      // If approved, create a published resource automatically!
      if (status === 'approved') {
        const approvedRes: AcademicResource = {
          id: `res-approved-${Date.now()}`,
          title: target.title,
          description: target.description || 'Student contributed resource approved by moderation panel.',
          subjectId: target.subjectCode,
          subjectCode: target.subjectCode,
          subjectName: target.subjectCode,
          departmentId: target.department.toLowerCase(),
          semester: target.semester,
          regulation: '2021',
          resourceType: target.resourceType,
          s3Key: `submissions/${target.fileName}`,
          fileName: target.fileName,
          fileSize: target.fileSize,
          fileType: 'application/pdf',
          isVerified: true,
          isOfficial: false,
          status: 'published',
          downloadsCount: 0,
          viewsCount: 0,
          uploadedAt: new Date().toISOString().split('T')[0],
          uploaderName: `${target.studentName} (Student Contributor)`,
          previewUrl: '/sample-document.pdf',
        };
        this.saveResource(approvedRes);
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(current));
      }
    }
  },

  // --- Issue Reports ---
  getReports(): IssueReport[] {
    if (typeof window === 'undefined') return MOCK_REPORTS;
    try {
      const stored = localStorage.getItem(REPORTS_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error(e);
    }
    return MOCK_REPORTS;
  },

  addReport(report: Omit<IssueReport, 'id' | 'status' | 'createdAt'>): IssueReport {
    const newReport: IssueReport = {
      ...report,
      id: `rep-${Date.now()}`,
      status: 'open',
      createdAt: new Date().toISOString(),
    };
    const current = this.getReports();
    const updated = [newReport, ...current];
    if (typeof window !== 'undefined') {
      localStorage.setItem(REPORTS_KEY, JSON.stringify(updated));
    }
    return newReport;
  },

  updateReportStatus(id: string, status: 'open' | 'investigating' | 'resolved' | 'rejected'): void {
    const current = this.getReports();
    const target = current.find((r) => r.id === id);
    if (target) {
      target.status = status;
      if (typeof window !== 'undefined') {
        localStorage.setItem(REPORTS_KEY, JSON.stringify(current));
      }
    }
  },

  // --- Subjects ---
  getSubjects(): Subject[] {
    return SUBJECTS;
  },

  getSubjectByCode(code: string): Subject | undefined {
    return SUBJECTS.find((s) => s.code.toLowerCase() === code.toLowerCase());
  },

  // --- Notifications ---
  getNotifications(): NotificationItem[] {
    return MOCK_NOTIFICATIONS;
  },
};
