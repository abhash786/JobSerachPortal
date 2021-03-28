import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ValidationHelper } from 'src/app/HelperClasses/ValidationHelper';
import { EmployerInfo } from 'src/app/Models/EmployerInfo';
import { DataCache } from 'src/app/Services/DataCache';
import { DataService } from 'src/app/Services/DataService';

@Component({
  selector: 'app-employer-registration',
  templateUrl: './employer-registration.component.html',
  styleUrls: ['./employer-registration.component.css']
})
export class EmployerRegistrationComponent implements OnInit {

  public employerInfo: EmployerInfo = {} as EmployerInfo;
  confirmPassword: string = ""

  constructor(public cache: DataCache, private toastr: ToastrService, private router: Router, private dataService: DataService) {
    this.employerInfo.businessStreamId = 0;
    this.employerInfo.empTypeId = 0;
    this.employerInfo.incId = 0;
  }

  ngOnInit(): void {
  }


  public validate() {
    if (!this.employerInfo.empFullName)
    {
      this.toastr.error('Organization Name is required!');
      return false;
    }

    if (!this.employerInfo.password)
    {
      this.toastr.error('password is required!');
      return false;
    }

    if (!this.employerInfo.empContactPersonName)
    {
      this.toastr.error('Contact Person Name is required!');
      return false;
    }

    if (!this.employerInfo.empGstin)
    {
      this.toastr.error('GSTIN number is required!');
      return false;
    }

    if (!this.employerInfo.password)
    {
      this.toastr.error('password is required!');
      return false;
    }
    if (this.employerInfo.password !== this.confirmPassword)
    {
      this.toastr.error('Password and confirm password do not match!');
      return false;
    }

    if (!this.employerInfo.empContactNo || !ValidationHelper.validatePhoneNumber(this.employerInfo.empContactNo))
    {
      this.toastr.error('phone number is required!');
      return false;
    }
    if (!this.employerInfo.empEmailId || !ValidationHelper.validateEmail(this.employerInfo.empEmailId))
    {
      this.toastr.error('Email is required!');
      return false;
    }

    return true;
  }

}
