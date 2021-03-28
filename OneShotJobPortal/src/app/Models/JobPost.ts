export interface JobPost {
    id: number;
    jobPostingId: number;
    jobPostingCode: string;
    postedByEmpId: number;
    jobPostTypeId: number;
    isCompanyNameHidden: boolean;
    jobCreatedDate: string;
    jobDescription: string;
    jobLocationId: number;
    isJobActive: boolean;
    jobPrimarySkill: string;
    jobSecondarySkill: string;
    minExp: number | null;
    maxExp: number | null;
    jobTitle: string;
    pkgRangeFrom: number | null;
    pkgRangeTo: number | null;
    desiredEdu: string;
    companyInfo: any;
}