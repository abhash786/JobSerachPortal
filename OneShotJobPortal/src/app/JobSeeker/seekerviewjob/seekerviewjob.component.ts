import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { JobPost } from 'src/app/Models/JobPost';
import { JobPostActivity } from 'src/app/Models/JobPostActivity';
import { DataCache } from 'src/app/Services/DataCache';
import { DataService } from 'src/app/Services/DataService';

@Component({
  selector: 'app-seekerviewjob',
  templateUrl: './seekerviewjob.component.html',
  styleUrls: ['./seekerviewjob.component.css']
})
export class SeekerviewjobComponent implements OnInit {
  public job: JobPost = {} as JobPost;
  constructor(public cache: DataCache, private dataService: DataService, private toastr: ToastrService, private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  apply() {
    var applyJob: JobPostActivity = {
      id: 0,
      skrId: this.cache.seekerInfo.skrId,
      jobPostingId: this.job.jobPostingId,
      applicantApplyDate: null
    };

    this.dataService.CreateJobActivity(applyJob).subscribe(data => this.toastr.success("Job application sent successfully"),
      err => this.toastr.error(err));
  }

  getJobType(id: number) {
    return this.cache.JobTypes.find(x => x.jobTypeId == id)?.jobTypeDesc;
  }

  getJobLocation(id: number) {
    return this.cache.LocationMasters.find(x => x.locationId == id)?.city;
  }
}
