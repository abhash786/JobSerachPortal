import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EducationDetail } from 'src/app/Models/EducationDetail';
import { ExprerienceDetail } from 'src/app/Models/ExperienceDetail';
import { JobPost } from 'src/app/Models/JobPost';
import { SeekerProfile } from 'src/app/Models/SeekerProfile';
import { DataCache } from 'src/app/Services/DataCache';
import { DataService } from 'src/app/Services/DataService';
import { SearchCompanyComponent } from '../search-company/search-company.component';
import { SearchJobComponent } from '../search-job/search-job.component';
import { SeekerDescriptionComponent } from '../seeker-description/seeker-description.component';
import { SeekerLeftMenuComponent } from '../seeker-left-menu/seeker-left-menu.component';
import { SeekerviewjobComponent } from '../seekerviewjob/seekerviewjob.component';
import { UpdateCandidateProfileComponent } from '../update-candidate-profile/update-candidate-profile.component';

@Component({
  selector: 'app-jobseekerprofile',
  templateUrl: './jobseekerprofile.component.html',
  styleUrls: ['./jobseekerprofile.component.css']
})
export class JobseekerprofileComponent implements OnInit {

  skillSets: any[] = [];
  educations: EducationDetail[] = [];
  experience: ExprerienceDetail[] = [];
  seekerInfo: SeekerProfile = {} as SeekerProfile;
  @ViewChild(SeekerDescriptionComponent, { static: false }) seekerDescription: SeekerDescriptionComponent;
  @ViewChild(SeekerLeftMenuComponent, { static: false }) seekerleftMenu: SeekerLeftMenuComponent;
  @ViewChild(SearchJobComponent, { static: false }) searchJob: SearchJobComponent;
  @ViewChild(SearchCompanyComponent, { static: false }) searchCompany: SearchCompanyComponent;
  @ViewChild(UpdateCandidateProfileComponent, { static: false }) updateProfile: UpdateCandidateProfileComponent;
  @ViewChild(SeekerviewjobComponent, { static: false }) viewJobComponent: SeekerviewjobComponent;

  public isHome: boolean = true;
  public isUpdateProfile: boolean = false;
  public isSearchCompany: boolean = false;
  public isSearchJob: boolean = false;
  public isJobHistory: boolean = false;
  public isNavigation: boolean = false;
  public isUpdateEdu: boolean = false;
  public isUpdateExp: boolean = false;
  public isUpload: boolean = false;
  public isViewJob: boolean = false;
  displayMenu: boolean = true;

  constructor(public cache: DataCache, private dataService: DataService, private toastr: ToastrService,
    private router: Router, private changeDetector: ChangeDetectorRef) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state)
    {
      var user = navigation.extras.state as SeekerProfile;
      if (user)
      {
        this.seekerInfo = user;
        this.isNavigation = true;
      }
    }
    else
      this.seekerInfo = this.cache.seekerInfo;


  }

  ngOnInit(): void {
    this.changeDetector.detectChanges();
    this.seekerleftMenu.updateSeekerInfo(this.seekerInfo);
    this.seekerDescription.updateSeekerInfo(this.seekerInfo);
    if (this.isNavigation)
    {
      this.displayMenu = false;
      this.seekerleftMenu.disableMenu();
    }
  }

  public NavigateView(name: string) {
    this.ResetView();
    (this as any)[name] = true;
  }

  public ResetView() {
    this.isHome = false;
    this.isUpdateProfile = false;
    this.isSearchCompany = false;
    this.isSearchJob = false;
    this.isJobHistory = false;
    this.isUpdateExp = false;
    this.isUpdateEdu = false;
    this.isUpload = false;
    this.isViewJob = false;
    this.changeDetector.detectChanges();

  }

  public viewJob(job: JobPost) {
    this.ResetView();
    this.isViewJob = true;
    this.changeDetector.detectChanges();
    this.viewJobComponent.job = job;
  }


  public upload = (files: any, isResume: boolean) => {
    if (isResume)
      this.fileUpload(files, this.seekerInfo.skrId, true)?.subscribe(() => this.toastr.success("Profile Resume uploaded successfully."), error =>
        this.toastr.error("an error while uploading profile Resume."));
    else
      this.fileUpload(files, this.seekerInfo.skrId, false)?.subscribe(() => this.toastr.success("Profile Photo uploaded successfully."), error =>
        this.toastr.error("an error while uploading profile photo."));
  }

  public fileUpload(files: any, userid: number, isResume: boolean) {
    if (files.length === 0)
    {
      return;
    }
    let fileToUpload = <File> files[0];
    const formData = new FormData();
    var filename = userid.toString();
    var ext = fileToUpload.name.split('.').pop();
    if (isResume)
      filename += "_Resume" + "." + ext;
    else
      filename += "_Photo" + "." + ext;

    formData.append('file', fileToUpload, filename);
    return this.dataService.uploadFile(formData);

  }

}
