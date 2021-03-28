export interface EducationDetail {
    id: number;
    skrId: number | null;
    skrCode: string;
    courseId: number | null;
    courseSpecialization: string;
    otherCourseName: string;
    instituteName: string;
    universityBoardName: string;
    courseStartDate: string;
    courseCompletionDate: string | null;
    percentageOrCgpa: number | null;
}