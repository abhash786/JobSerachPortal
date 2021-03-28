import { Component, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployerInfo } from 'src/app/Models/EmployerInfo';
import { DataCache } from 'src/app/Services/DataCache';
import { DataService } from 'src/app/Services/DataService';

@Component({
  selector: 'app-employer-additional-details',
  templateUrl: './employer-additional-details.component.html',
  styleUrls: ['./employer-additional-details.component.css']
})
export class EmployerAdditionalDetailsComponent implements OnInit {
  public employerInfo: EmployerInfo = {} as EmployerInfo;

  constructor(public cache: DataCache, private toastr: ToastrService, private router: Router, private dataService: DataService) {
    const navigation = this.router.getCurrentNavigation();

    var user = navigation?.extras?.state as EmployerInfo;
    if (user)
    {
      this.employerInfo = user;
    }
    else
    {
      this.employerInfo = this.cache.employerInfo;
    }
    if (!this.employerInfo)
    {
      this.toastr.error("you cannot view Additional Info page. Redirected to signup page...");
      this.router.navigate(['/signup']);
    }
  }

  ngOnInit(): void { }

  public onSubmit() {
    this.dataService.UpdateEmployerInfo(this.employerInfo).subscribe(data => {
      this.toastr.success("Employer info updated successfully");
      this.router.navigate(['/companyprofile']);
    }, err => this.toastr.error(err));
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

    filename += "_logo" + "." + ext;

    formData.append('file', fileToUpload, filename);
    return this.dataService.uploadFile(formData);

  }

  public uploadPhoto = (files: any) => {
    this.fileUpload(files, this.employerInfo.empId, false)?.subscribe(() => {
      this.toastr.success("Profile Photo uploaded successfully.");
    }, error =>
      this.toastr.error(error));
  }
}
