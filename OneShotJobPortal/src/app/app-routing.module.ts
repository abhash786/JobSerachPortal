import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponentComponent } from './Securities/login-component/login-component.component';
import { SingupComponentComponent } from './Securities/singup-component/singup-component.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { JobseekerprofileComponent } from './JobSeeker/jobseekerprofile/jobseekerprofile.component';
import { SeekerAdditionalDetailsComponent } from './Securities/seeker-additional-details/seeker-additional-details.component';
import { EmployerAdditionalDetailsComponent } from './Securities/employer-additional-details/employer-additional-details.component';
import { AuthGuardService } from './Services/AuthGuardService';
import { SeekerUploadComponentComponent } from './Securities/seeker-upload-component/seeker-upload-component.component';
import { CorporateUploadComponent } from './Securities/corporate-upload/corporate-upload.component';
import { EmployerProfileComponentComponent } from './Employer/employer-profile-component/employer-profile-component.component';
import { SeekerAuthGuardService } from './Services/SeekerAuthGuardService';
import { SearchCandidatesComponent } from './Employer/search-candidates/search-candidates.component';

const routes: Routes = [
  { path: 'login', component: LoginComponentComponent },
  { path: 'signup', component: SingupComponentComponent },
  { path: 'carousel', component: HomeComponentComponent },
  { path: 'candidateprofile', component: JobseekerprofileComponent, canActivate: [AuthGuardService] },
  { path: 'companyprofile', component: EmployerProfileComponentComponent, canActivate: [AuthGuardService] },
  { path: 'upload', component: SeekerUploadComponentComponent, canActivate: [AuthGuardService] },
  { path: 'seekeraddtionaldetails', component: SeekerAdditionalDetailsComponent },
  { path: 'employeraddtionaldetails', component: EmployerAdditionalDetailsComponent },
  { path: 'corporateUpload', component: CorporateUploadComponent },
  { path: 'searchcandidate', component: SearchCandidatesComponent },
  { path: 'home', component: LoginComponentComponent },
  { path: '**', component: LoginComponentComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
