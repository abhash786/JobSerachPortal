import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BusinessStream } from "../Models/BusinessStream";
import { CourseMaster } from "../Models/CourseMaster";
import { EmployerInfo } from "../Models/EmployerInfo";
import { EmployerTypeMaster } from "../Models/EmployerTypeMaster";
import { IncorporationType } from "../Models/IncorporationType";
import { JobType } from "../Models/JobType";
import { LocationMaster } from "../Models/LocationMaster";
import { SeekerProfile } from "../Models/SeekerProfile";
import { SeekerType } from "../Models/SeekerType";
import { SkillsSet } from "../Models/SkillsSet";

@Injectable({
    providedIn: 'root',
})
export class DataCache {

    public CourseMasters: CourseMaster[] = [];
    public BusinessStreams: BusinessStream[] = [];
    public EmployerTypeMasters: EmployerTypeMaster[] = [];
    public IncorporationTypes: IncorporationType[] = [];
    public LocationMasters: LocationMaster[] = [];
    public SeekerTypes: SeekerType[] = [];
    public SkillsSets: SkillsSet[] = [];
    public JobTypes: JobType[] = [];
    public tempPassword: string = "";

    constructor(private router: Router) {

    }

    get isAuthenticated(): boolean {
        return localStorage.getItem("isAuthenticated") == "true";
    }

    get isCorporate(): boolean {
        return localStorage.getItem("isCorporate") == "true";
    }

    get token(): string | null {
        return localStorage.getItem("token");
    }

    get seekerInfo(): SeekerProfile {
        var data = localStorage.getItem("seekerInfo");
        if (data)
            return JSON.parse(data);
        else
            return {} as SeekerProfile;
    }

    set seekerInfo(info: SeekerProfile) {
        localStorage.setItem("seekerInfo", JSON.stringify(info));
    }

    get employerInfo(): EmployerInfo {
        var data = localStorage.getItem("employerInfo");
        if (data)
            return JSON.parse(data);
        else
            return {} as EmployerInfo;
    }

    set employerInfo(info: EmployerInfo) {
        localStorage.setItem("employerInfo", JSON.stringify(info));
    }

    public login(user: SeekerProfile, token: string) {
        this.logout(false);
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("isCorporate", "false");
        localStorage.setItem("token", token);
        localStorage.setItem("seekerInfo", JSON.stringify(user));
    }
    public corporateLogin(user: EmployerInfo, token: string) {
        this.logout(false);
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("isCorporate", "true");
        localStorage.setItem("token", token);
        localStorage.setItem("employerInfo", JSON.stringify(user));
    }

    public logout(navigate: boolean): void {
        /*         this.CourseMasters = [];
                this.BusinessStreams = [];
                this.EmployerTypeMasters = [];
                this.IncorporationTypes = [];
                this.LocationMasters = [];
                this.SeekerTypes = [];
                this.SkillsSets = []; */
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("token");
        localStorage.removeItem("seekerInfo");
        localStorage.removeItem("isCorporates");
        localStorage.clear();
        sessionStorage.clear();
        if (navigate)
            this.router.navigate(['/login']);
    }
}