import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataCache } from 'src/app/Services/DataCache';
import { DataService } from 'src/app/Services/DataService';

@Component({
  selector: 'app-corporate-upload',
  templateUrl: './corporate-upload.component.html',
  styleUrls: ['./corporate-upload.component.css']
})
export class CorporateUploadComponent implements OnInit {
  public userid: number;

  constructor(private dataService: DataService, private toastr: ToastrService, private router: Router, private cache: DataCache) {
    this.userid = this.cache.employerInfo.empId;
  }

  ngOnInit(): void {
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
    this.fileUpload(files, this.userid, false)?.subscribe(() => {
      this.toastr.success("Profile Photo uploaded successfully.");
      this.skipStep();
    }, error =>
      this.toastr.error(error));
  }

  public skipStep(): void {
    this.dataService.login(this.cache.employerInfo.empEmailId, this.cache.tempPassword, true).subscribe(resp => {
      this.cache.corporateLogin(resp.user, resp.token);
      this.cache.tempPassword = "";
      this.router.navigate(['/companyprofile']);
    }, (error) => {
      // Display error message
      this.toastr.error(error);
    });
  }

}
