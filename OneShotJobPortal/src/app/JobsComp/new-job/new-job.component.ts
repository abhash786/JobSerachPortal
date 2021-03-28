import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EmployerInfo } from 'src/app/Models/EmployerInfo';
import { JobPost } from 'src/app/Models/JobPost';
import { DataCache } from 'src/app/Services/DataCache';
import { DataService } from 'src/app/Services/DataService';

@Component({
  selector: 'app-new-job',
  templateUrl: './new-job.component.html',
  styleUrls: ['./new-job.component.css']
})
export class NewJobComponent implements OnInit {

  employerInfo: EmployerInfo = {} as EmployerInfo;
  newJob: JobPost = {} as JobPost;
  secondrSkills: string[] = [];
  isEdit: boolean = false;

  constructor(public cache: DataCache, private dataService: DataService, private toastr: ToastrService) {
    this.employerInfo = this.cache.employerInfo;
    this.initializeNewJob();
    this.isEdit = false;
  }

  ngOnInit(): void {
  }
  public primarySkillChanged() {
    this.secondrSkills = [];
    var subSkills = this.cache.SkillsSets.filter(x => x.skillSetName == this.newJob.jobPrimarySkill);
    subSkills.forEach(element => {
      this.secondrSkills.push(element.subSkilllSetName);
    });
  }

  public postJob() {
    if (this.isEdit)
    {
      this.dataService.putJob(this.newJob).subscribe(data => {
        this.toastr.success("Job changed successfully");
        this.initializeNewJob();
      }, err => this.toastr.error(err));
    }
    else
    {
      this.newJob.postedByEmpId = this.employerInfo.empId;
      this.dataService.postJob(this.newJob).subscribe(data => {
        this.toastr.success("Job posted successfully");
        this.initializeNewJob();
      }, err => this.toastr.error(err));
    }
  }

  private initializeNewJob() {
    this.newJob.jobPostTypeId = 0;
    this.newJob.jobLocationId = 0;
    this.newJob.jobPrimarySkill = "0";
    this.newJob.jobSecondarySkill = "0";
    this.newJob.pkgRangeFrom = 0;
    this.newJob.pkgRangeTo = 0;
    this.newJob.jobTitle = "Job Title"
    this.newJob.jobDescription = "Sample Job Description";
    this.newJob.minExp = 0;
    this.newJob.maxExp = 0;
    this.newJob.desiredEdu = "";
    this.newJob.isJobActive = true;
  }

  public editJobDetails(job: JobPost) {
    this.isEdit = true;
    this.newJob = job;
    this.primarySkillChanged();
  }
}
