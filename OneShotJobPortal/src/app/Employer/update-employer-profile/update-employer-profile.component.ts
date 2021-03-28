import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployerInfo } from 'src/app/Models/EmployerInfo';
import { DataCache } from 'src/app/Services/DataCache';
import { DataService } from 'src/app/Services/DataService';

@Component({
  selector: 'app-update-employer-profile',
  templateUrl: './update-employer-profile.component.html',
  styleUrls: ['./update-employer-profile.component.css']
})
export class UpdateEmployerProfileComponent implements OnInit {
  public employerInfo: EmployerInfo = {} as EmployerInfo;

  constructor(public cache: DataCache, private toastr: ToastrService, private router: Router, private dataService: DataService) {
    this.employerInfo = this.cache.employerInfo;
  }

  ngOnInit(): void {
  }
  onSubmit() {
    this.dataService.UpdateEmployerInfo(this.employerInfo).subscribe(data => this.toastr.success("User info updated successfully"), err => this.toastr.error(err));
  }
}
