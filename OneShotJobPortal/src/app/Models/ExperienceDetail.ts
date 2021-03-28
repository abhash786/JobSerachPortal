export interface ExprerienceDetail {
    id: number;
    skrId: number;
    skrCode: string;
    skrTypeId: number | null;
    joiningDate: string;
    isCurrentJob: boolean;
    leavingDate: string;
    jobTitle: string;
    empName: string;
    jobCity: string;
    jobState: string;
    jobCountry: string;
    jobProjectDesc: string;
    skr: number;
    skrCodeNavigation: number;
    skrType: number;
    primarySkill: number;
}