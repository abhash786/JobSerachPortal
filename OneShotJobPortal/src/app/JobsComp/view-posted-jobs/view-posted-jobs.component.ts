import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EmployerInfo } from 'src/app/Models/EmployerInfo';
import { JobPost } from 'src/app/Models/JobPost';
import { DataCache } from 'src/app/Services/DataCache';
import { DataService } from 'src/app/Services/DataService';

@Component({
  selector: 'app-view-posted-jobs',
  templateUrl: './view-posted-jobs.component.html',
  styleUrls: ['./view-posted-jobs.component.css']
})
export class ViewPostedJobsComponent implements OnInit {
  employerInfo: EmployerInfo = {} as EmployerInfo;
  postedJobs: JobPost[] = [];
  @Output() editJobEvt = new EventEmitter<JobPost>();
  @Output() viewJobEvt = new EventEmitter<JobPost>();
  message: string = "";

  constructor(public cache: DataCache, private dataService: DataService, private toastr: ToastrService) {
    this.employerInfo = this.cache.employerInfo;
    this.dataService.getAllJobsByCompanyId(this.employerInfo.empId).subscribe(data => {
      this.postedJobs = data;
      if (this.postedJobs?.length > 0)
        this.message = "Total " + this.postedJobs.length + " Jobs found.";
      else
        this.message = "No Posted Job Found...";
    }, err => this.toastr.error(err));
  }
  ngOnInit(): void {
  }
  public viewJob(index: number) {
    this.viewJobEvt.emit(this.postedJobs[index]);

  }
  public editJob(index: number) {
    this.editJobEvt.emit(this.postedJobs[index]);
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
