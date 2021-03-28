import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { JobViewerComponent } from 'src/app/JobsComp/job-viewer/job-viewer.component';
import { NewJobComponent } from 'src/app/JobsComp/new-job/new-job.component';
import { ViewPostedJobsComponent } from 'src/app/JobsComp/view-posted-jobs/view-posted-jobs.component';
import { EmployerInfo } from 'src/app/Models/EmployerInfo';
import { JobPost } from 'src/app/Models/JobPost';
import { DataCache } from 'src/app/Services/DataCache';
import { DataService } from 'src/app/Services/DataService';
import { EmpHomeDescriptionComponent } from '../emp-home-description/emp-home-description.component';
import { SearchCandidatesComponent } from '../search-candidates/search-candidates.component';

@Component({
  selector: 'app-employer-profile-component',
  templateUrl: './employer-profile-component.component.html',
  styleUrls: ['./employer-profile-component.component.css']
})
export class EmployerProfileComponentComponent implements OnInit {


  skillSets: any[] = [];
  employerInfo: EmployerInfo = {} as EmployerInfo;
  public isAboutContact: boolean = true;
  public isViewPostedJob: boolean = false;
  public isViewJob: boolean = false;
  public isNewJob: boolean = false;
  public isSearchCandidate: boolean = false;
  public isUpdating: boolean = false;

  @ViewChild(EmpHomeDescriptionComponent, { static: false }) seekerComponent: EmpHomeDescriptionComponent;
  @ViewChild(SearchCandidatesComponent, { static: false }) searchComponent: SearchCandidatesComponent;
  @ViewChild(NewJobComponent, { static: false }) newJobComponent: NewJobComponent;
  @ViewChild(ViewPostedJobsComponent, { static: false }) viewPostedJobComponent: ViewPostedJobsComponent;
  @ViewChild(JobViewerComponent, { static: false }) jobViewerComponent: JobViewerComponent;


  constructor(public cache: DataCache, private dataService: DataService, private toastr: ToastrService, private changeDetector: ChangeDetectorRef) {
    this.employerInfo = this.cache.employerInfo;
  }

  ngOnInit(): void {


  }

  public NavigateView(name: string) {
    this.ResetView();
    (this as any)[name] = true;
  }

  public ResetView() {
    this.isAboutContact = false;
    this.isViewPostedJob = false;
    this.isNewJob = false;
    this.isSearchCandidate = false;
    this.isViewJob = false;
    this.isUpdating = false;
    this.changeDetector.detectChanges();

  }

  public viewJob(job: JobPost) {
    this.ResetView();
    this.isViewJob = true;
    this.changeDetector.detectChanges();
    this.jobViewerComponent.jobId = job.jobPostingId;
  }
  public editJob(job: JobPost) {
    this.ResetView();
    this.isNewJob = true;
    this.changeDetector.detectChanges();
    this.newJobComponent.editJobDetails(job);
  }

}
