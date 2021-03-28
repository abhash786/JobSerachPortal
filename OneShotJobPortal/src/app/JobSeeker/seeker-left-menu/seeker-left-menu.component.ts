import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SeekerProfile } from 'src/app/Models/SeekerProfile';
import { DataService } from 'src/app/Services/DataService';

@Component({
  selector: 'app-seeker-left-menu',
  templateUrl: './seeker-left-menu.component.html',
  styleUrls: ['./seeker-left-menu.component.css']
})
export class SeekerLeftMenuComponent implements OnInit {
  seekerInfo: SeekerProfile = {} as SeekerProfile;
  @Output() viewChanged = new EventEmitter<string>();
  displayMenu: boolean = true;
  constructor(private dataService: DataService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  public updateSeekerInfo(info: SeekerProfile) {
    this.seekerInfo = info;
  }

  public NavigateView(name: string) {
    this.viewChanged.emit(name);
  }

  public disableMenu() {
    this.displayMenu = false;
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
