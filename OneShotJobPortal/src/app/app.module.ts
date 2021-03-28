import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './app-layout/app-header/app-header.component';
import { AppFooterComponent } from './app-layout/app-footer/app-footer.component';
import { AppContentComponent } from './app-layout/app-content/app-content.component';
import { CarouselElementComponent } from './app-layout/carousel-element/carousel-element.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { LoginComponentComponent } from './Securities/login-component/login-component.component';
import { SingupComponentComponent } from './Securities/singup-component/singup-component.component';
import { DataService } from './Services/DataService';
import { DataCache } from './Services/DataCache';
import { HttpRequestInterceptor } from './Services/HttpRequestInterceptor';
import { ListInputControlComponent } from './SharedControls/list-input-control/list-input-control.component';
import { JobseekerprofileComponent } from './JobSeeker/jobseekerprofile/jobseekerprofile.component';
import { EmployerRegistrationComponent } from './Securities/employer-registration/employer-registration.component';
import { SeekerRegistrationComponent } from './Securities/seeker-registration/seeker-registration.component';
import { SeekerAdditionalDetailsComponent } from './Securities/seeker-additional-details/seeker-additional-details.component';
import { EmployerAdditionalDetailsComponent } from './Securities/employer-additional-details/employer-additional-details.component';
import { EducationDetailsComponent } from './Securities/education-details/education-details.component';
import { ExperienceDetailsComponent } from './Securities/experience-details/experience-details.component';
import { SeekerUploadComponentComponent } from './Securities/seeker-upload-component/seeker-upload-component.component';
import { AuthGuardService } from './Services/AuthGuardService';
import { CorporateUploadComponent } from './Securities/corporate-upload/corporate-upload.component';
import { EmployerProfileComponentComponent } from './Employer/employer-profile-component/employer-profile-component.component';
import { SeekerAuthGuardService } from './Services/SeekerAuthGuardService';
import { SearchCandidatesComponent } from './Employer/search-candidates/search-candidates.component';
import { NewJobComponent } from './JobsComp/new-job/new-job.component';
import { EmpHomeLeftMenuComponent } from './Employer/emp-home-left-menu/emp-home-left-menu.component';
import { EmpHomeDescriptionComponent } from './Employer/emp-home-description/emp-home-description.component';
import { ViewPostedJobsComponent } from './JobsComp/view-posted-jobs/view-posted-jobs.component';
import { JobViewerComponent } from './JobsComp/job-viewer/job-viewer.component';
import { SeekerLeftMenuComponent } from './JobSeeker/seeker-left-menu/seeker-left-menu.component';
import { SeekerDescriptionComponent } from './JobSeeker/seeker-description/seeker-description.component';
import { SearchCompanyComponent } from './JobSeeker/search-company/search-company.component';
import { SearchJobComponent } from './JobSeeker/search-job/search-job.component';
import { UpdateCandidateProfileComponent } from './JobSeeker/update-candidate-profile/update-candidate-profile.component';
import { JobApplicationHistoryComponent } from './JobSeeker/job-application-history/job-application-history.component';
import { UpdateExperienceComponent } from './JobSeeker/update-experience/update-experience.component';
import { UpdateEducationComponent } from './JobSeeker/update-education/update-education.component';
import { UpdateSkillSetsComponent } from './JobSeeker/update-skill-sets/update-skill-sets.component';
import { UpdateEmployerProfileComponent } from './Employer/update-employer-profile/update-employer-profile.component';
import { SeekerviewjobComponent } from './JobSeeker/seekerviewjob/seekerviewjob.component';
import { VersionCheckService } from './Services/version-check.service';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppFooterComponent,
    AppContentComponent,
    CarouselElementComponent,
    HomeComponentComponent,
    LoginComponentComponent,
    SingupComponentComponent,
    ListInputControlComponent,
    JobseekerprofileComponent,
    EmployerRegistrationComponent,
    SeekerRegistrationComponent,
    SeekerAdditionalDetailsComponent,
    EmployerAdditionalDetailsComponent,
    EducationDetailsComponent,
    ExperienceDetailsComponent,
    SeekerUploadComponentComponent,
    CorporateUploadComponent,
    EmployerProfileComponentComponent,
    SearchCandidatesComponent,
    NewJobComponent,
    EmpHomeLeftMenuComponent,
    EmpHomeDescriptionComponent,
    ViewPostedJobsComponent,
    JobViewerComponent,
    SeekerLeftMenuComponent,
    SeekerDescriptionComponent,
    SearchCompanyComponent,
    SearchJobComponent,
    UpdateCandidateProfileComponent,
    JobApplicationHistoryComponent,
    UpdateExperienceComponent,
    UpdateEducationComponent,
    UpdateSkillSetsComponent,
    UpdateEmployerProfileComponent,
    SeekerviewjobComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    HttpClientModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([])
  ],
  providers: [DataService, DataCache, AuthGuardService, VersionCheckService, SeekerAuthGuardService, {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpRequestInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
