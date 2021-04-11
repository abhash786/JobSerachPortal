import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { SeekerProfile } from "../Models/SeekerProfile";
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';
import { EmployerInfo } from "../Models/EmployerInfo";
import { DataCache } from "./DataCache";
import { ToastrService } from "ngx-toastr";
import { EducationDetail } from "../Models/EducationDetail";
import { CourseMaster } from "../Models/CourseMaster";
import { BusinessStream } from "../Models/BusinessStream";
import { EmployerTypeMaster } from "../Models/EmployerTypeMaster";
import { IncorporationType } from "../Models/IncorporationType";
import { LocationMaster } from "../Models/LocationMaster";
import { SeekerType } from "../Models/SeekerType";
import { SkillsSet } from "../Models/SkillsSet";
import { ExprerienceDetail } from "../Models/ExperienceDetail";
import { SeekersSkillsSet } from "../Models/SeekersSkillsSet";
import { SearchInput } from "../Models/searchinput";
import { JobType } from "../Models/JobType";
import { JobPost } from "../Models/JobPost";
import { JobPostActivity } from "../Models/JobPostActivity";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root',
})
export class DataService {


    constructor(private httpClient: HttpClient, private cache: DataCache, private toastr: ToastrService) {
        this.getAllBusinessStream().subscribe(data => this.cache.BusinessStreams = data);
        this.getAllCourses().subscribe(data => this.cache.CourseMasters = data);
        this.getAllEmployerTypeMaster().subscribe(data => this.cache.EmployerTypeMasters = data);
        this.getAllIncorporationType().subscribe(data => this.cache.IncorporationTypes = data);
        this.getAllLocationMaster().subscribe(data => this.cache.LocationMasters = data);
        this.getAllSeekerType().subscribe(data => this.cache.SeekerTypes = data);
        this.getAllSkillsSet().subscribe(data => this.cache.SkillsSets = data);
        this.getAllJobType().subscribe(data => this.cache.JobTypes = data);
    }

    public get<T>(url: string, itemType: any): Observable<T> {
        return this.httpClient.get<T>(url).pipe(
            catchError(this.handleError));
    }

    public getAllCourses(): Observable<CourseMaster[]> {
        return this.get<CourseMaster[]>(environment.apiUrl + "CourseMasters", {} as CourseMaster);
    }

    public getAllBusinessStream(): Observable<BusinessStream[]> {
        return this.get<BusinessStream[]>(environment.apiUrl + "BusinessStreams", {} as BusinessStream);
    }

    public getAllEmployerTypeMaster(): Observable<EmployerTypeMaster[]> {
        return this.get<EmployerTypeMaster[]>(environment.apiUrl + "EmployerTypeMasters", {} as EmployerTypeMaster);
    }

    public getAllIncorporationType(): Observable<IncorporationType[]> {
        return this.get<IncorporationType[]>(environment.apiUrl + "IncorporationTypes", {} as IncorporationType);
    }

    public getAllLocationMaster(): Observable<LocationMaster[]> {
        return this.get<LocationMaster[]>(environment.apiUrl + "LocationMasters", {} as LocationMaster);
    }

    public getAllSeekerType(): Observable<SeekerType[]> {
        return this.get<SeekerType[]>(environment.apiUrl + "SeekerTypes", {} as SeekerType);
    }

    public getAllSkillsSet(): Observable<SkillsSet[]> {
        return this.get<SkillsSet[]>(environment.apiUrl + "SkillsSets", {} as SkillsSet);
    }

    public getAllJobType(): Observable<JobType[]> {
        return this.get<JobType[]>(environment.apiUrl + "JobTypes", {} as JobType);
    }

    public createCorporateUser(user: any) {
        return this.httpClient.post<any>(environment.apiUrl + "EmployerInfo", user)
            .pipe(
                catchError(this.handleError)
            );
    }

    public searchCandidates(searchInput: SearchInput) {
        return this.httpClient.post<any>(environment.apiUrl + "Search", searchInput)
            .pipe(
                catchError(this.handleError)
            );
    }

    public getAllJobsAppliedByUserId(id: number) {
        return this.httpClient.get<JobPostActivity[]>(environment.apiUrl + "JobPostActivities/" + id + "/false/0")
            .pipe(
                catchError(this.handleError)
            );
    }

    public UpdateSeekerInfo(info: SeekerProfile) {
        return this.httpClient.put<SeekerProfile>(environment.apiUrl + "SeekerProfiles/" + info.skrId, info)
            .pipe(
                catchError(this.handleError)
            );
    }

    public UpdateEmployerInfo(info: EmployerInfo) {
        return this.httpClient.put<EmployerInfo>(environment.apiUrl + "EmployerInfo/" + info.empId, info)
            .pipe(
                catchError(this.handleError)
            );
    }

    public getAllJobsAppliedByCompanyId(id: number) {
        return this.httpClient.get<JobPostActivity[]>(environment.apiUrl + "JobPostActivities/" + id + "/true/0")
            .pipe(
                catchError(this.handleError)
            );
    }

    public getJobActivitiesByCompanyId(id: number, jobId: number) {
        return this.httpClient.get<JobPostActivity[]>(environment.apiUrl + "JobPostActivities/" + id + "/true/" + jobId)
            .pipe(
                catchError(this.handleError)
            );
    }

    public deleteEducation(skrid: number) {
        return this.httpClient.delete(environment.apiUrl + "EducationDetails/" + skrid)
            .pipe(
                catchError(this.handleError)
            );
    }
    public deleteExperience(skrid: number) {
        return this.httpClient.delete(environment.apiUrl + "ExprerienceDetails/" + skrid)
            .pipe(
                catchError(this.handleError)
            );
    }

    public getCompanyDetails(id: number) {
        return this.httpClient.put<EmployerInfo>(environment.apiUrl + "Search", id)
            .pipe(
                catchError(this.handleError)
            );
    }

    public refreshSeekerInfo() {
        return this.httpClient.get<SeekerProfile>(environment.apiUrl + "SeekerProfiles/" + this.cache.seekerInfo.skrId).subscribe(x => this.cache.seekerInfo = x,
            err => this.handleError(err));
    }

    public refreshEmployerInfo() {
        return this.httpClient.get<EmployerInfo>(environment.apiUrl + "EmployerInfo/" + this.cache.employerInfo.empId).subscribe(x => this.cache.employerInfo = x,
            err => this.handleError(err));
    }

    public CreateJobActivity(activity: JobPostActivity) {
        return this.httpClient.post(environment.apiUrl + "JobPostActivities", activity)
            .pipe(
                catchError(this.handleError)
            );
    }

    public searchJobs(searchInput: SearchInput) {
        return this.httpClient.post<any>(environment.apiUrl + "Search", searchInput)
            .pipe(
                catchError(this.handleError)
            );
    }

    public createSeekerProfile(user: SeekerProfile) {
        return this.httpClient.post<any>(environment.apiUrl + "SeekerProfiles", user)
            .pipe(
                catchError(this.handleError)
            );
    }

    public addEductionDetails(education: EducationDetail[]) {
        return this.httpClient.post(environment.apiUrl + "EducationDetails", education)
            .pipe(
                catchError(this.handleError)
            );
    }

    public postJob(newJob: JobPost) {
        return this.httpClient.post(environment.apiUrl + "JobPosts", newJob)
            .pipe(
                catchError(this.handleError)
            );
    }

    public putJob(newJob: JobPost) {
        return this.httpClient.put(environment.apiUrl + "JobPosts?id=" + newJob.jobPostingId, newJob)
            .pipe(
                catchError(this.handleError)
            );
    }

    public getAllJobsByCompanyId(empId: number): Observable<JobPost[]> {
        return this.httpClient.get<JobPost[]>(environment.apiUrl + "JobPosts" + "?empid=" + empId)
            .pipe(
                catchError(this.handleError)
            );
    }

    public addExperienceDetails(expe: ExprerienceDetail[]) {
        return this.httpClient.post(environment.apiUrl + "ExprerienceDetails", expe)
            .pipe(
                catchError(this.handleError)
            );
    }

    public addSkillLevel(skill: SeekersSkillsSet) {
        return this.httpClient.post(environment.apiUrl + "SeekersSkillsSets", skill)
            .pipe(
                catchError(this.handleError)
            );
    }

    public deleteSkillLevel(skrid: number | null) {
        return this.httpClient.delete(environment.apiUrl + "SeekersSkillsSets/" + skrid)
            .pipe(
                catchError(this.handleError)
            );
    }

    public uploadFile(formData: FormData) {
        return this.httpClient.post(environment.apiUrl + "FileUpload", formData);
    }

    public login(username: string, password: string, IsCorporate: boolean) {
        return this.httpClient.post<any>(environment.apiUrl + "security", { username: username, password: password, IsCorporate: IsCorporate })
            .pipe(
                catchError(this.handleError)
            );
    }

    public getSkillSets(skrCode: string) {
        return this.httpClient.get<any[]>(environment.apiUrl + "SeekersSkillsSets" + "?skrCode=" + skrCode)
            .pipe(
                catchError(this.handleError)
            );
    }

    public getEducations(skrCode: string) {
        return this.httpClient.get<EducationDetail[]>(environment.apiUrl + "EducationDetails" + "?skrCode=" + skrCode)
            .pipe(
                catchError(this.handleError)
            );
    }

    public getExperience(skrCode: string) {
        return this.httpClient.get<ExprerienceDetail[]>(environment.apiUrl + "ExprerienceDetails" + "?skrCode=" + skrCode)
            .pipe(
                catchError(this.handleError)
            );
    }
    /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
    private handleError(errorResponse: any) {
        // return an observable with a user-facing error message
        var message = "";
        if (errorResponse.error?.Exception?.Message)
            message = errorResponse.error.Exception.Message;
        else if (errorResponse.error?.Message)
            message = errorResponse.error.Message;
        else if (errorResponse.message)
            message = errorResponse.message;
        else if (errorResponse.Exception)
            message = errorResponse.Exception.Message;
        else
            message = errorResponse.message;
        return throwError(message);
    };
}

function retry(arg0: number): import("rxjs").OperatorFunction<Object, unknown> {
    throw new Error("Function not implemented.");
}
