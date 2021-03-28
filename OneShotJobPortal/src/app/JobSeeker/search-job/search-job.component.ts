import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JobPost } from 'src/app/Models/JobPost';
import { JobPostActivity } from 'src/app/Models/JobPostActivity';
import { SearchInput } from 'src/app/Models/searchinput';
import { SeekerProfile } from 'src/app/Models/SeekerProfile';
import { DataCache } from 'src/app/Services/DataCache';
import { DataService } from 'src/app/Services/DataService';

@Component({
  selector: 'app-search-job',
  templateUrl: './search-job.component.html',
  styleUrls: ['./search-job.component.css']
})
export class SearchJobComponent implements OnInit {

  public searchInput: SearchInput = {} as SearchInput;
  public jobs: JobPost[] = [];
  public message: string = "";
  @Output() viewJobEvt = new EventEmitter<JobPost>();

  constructor(public cache: DataCache, private dataService: DataService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.searchInput.category = "0";
    this.searchInput.location = "0";
  }

  public searchJobs() {
    this.message = "";

    if (this.searchInput.keyword || this.searchInput.location != "0" || this.searchInput.category != "0")
    {
      var inputs: SearchInput = {
        keyword: this.searchInput.keyword,
        location: this.searchInput.location,
        category: this.searchInput.category,
        isJob: false
      }
      if (inputs.location === "0")
        inputs.location = null;

      if (inputs.category === "0")
        inputs.category = null;

      inputs.isJob = true;
      this.dataService.searchCandidates(inputs).subscribe(data => {
        this.jobs = data.jobs;
        if (this.jobs.length > 0)
        {
          this.message = "Job(s) found: " + this.jobs.length;
          this.jobs.forEach(e => {
            if (!e.isCompanyNameHidden)
            {
              this.getCompanyDetails(e.postedByEmpId, e);
            }
          });
        }
        else
          this.message = "No job found for given inputs. Kindly try different keyword";
      }, err => this.toastr.error(err));
    }
    else
    {
      this.toastr.error("Kindly provide valid inputs");
    }
  }

  public getCompanyDetails(id: number, job: JobPost) {
    this.dataService.getCompanyDetails(id).subscribe(data => {
      job.companyInfo = data;
    }, err => this.toastr.error(err));
  }

  public apply(index: number) {
    var applyJob: JobPostActivity = {
      id: 0,
      skrId: this.cache.seekerInfo.skrId,
      jobPostingId: this.jobs[index].jobPostingId,
      applicantApplyDate: null
    };

    this.dataService.CreateJobActivity(applyJob).subscribe(data => this.toastr.success("Job application sent successfully"),
      err => this.toastr.error(err));

  }

  public viewJob(index: number) {
    this.viewJobEvt.emit(this.jobs[index]);
  }

  public getDate(date: string) {
    return new
      Date(Date.parse(date)).toDateString();
  }

  public getLocation(id: number) {
    var loc = this.cache.LocationMasters.find(x => x.locationId == id);
    return loc?.city + ", " + loc?.state + ", " + loc?.country;
  }
}
