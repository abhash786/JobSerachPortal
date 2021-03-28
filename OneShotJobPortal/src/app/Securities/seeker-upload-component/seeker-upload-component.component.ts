import { HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { error } from 'protractor';
import { SeekersSkillsSet } from 'src/app/Models/SeekersSkillsSet';
import { DataCache } from 'src/app/Services/DataCache';
import { DataService } from 'src/app/Services/DataService';

@Component({
  selector: 'app-seeker-upload-component',
  templateUrl: './seeker-upload-component.component.html',
  styleUrls: ['./seeker-upload-component.component.css']
})
export class SeekerUploadComponentComponent implements OnInit {


  public userid: number;
  public currentSkillSet: SeekersSkillsSet = { skillLevel: 0 } as SeekersSkillsSet;
  public skillLevel: SeekersSkillsSet[] = [];

  constructor(private dataService: DataService, private toastr: ToastrService, private router: Router, public cache: DataCache) {
    this.userid = this.cache.seekerInfo.skrId;
  }

  ngOnInit(): void {
    this.currentSkillSet.skillSetId = 0;
  }

  public upload = (files: any, isResume: boolean) => {
    if (isResume)
      this.fileUpload(files, this.userid, true)?.subscribe(() => this.toastr.success("Profile Resume uploaded successfully."), error =>
        this.toastr.error("an error while uploading profile Resume."));
    else
      this.fileUpload(files, this.userid, false)?.subscribe(() => this.toastr.success("Profile Photo uploaded successfully."), error =>
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

  public skipStep(): void {
    this.router.navigate(['/candidateprofile']);
  }

  public deleteskill(i: number) {
    this.skillLevel.splice(i, 1);
  }

  public getSkillNameName(id: number) {
    return this.cache.SkillsSets.find(x => x.skillSetId == id)?.skillSetName;
  }

  public getSubSkillNameName(id: string) {
    return this.cache.SkillsSets.find(x => x.skillSetName == id)?.subSkilllSetName;
  }

  public AddSkill() {
    this.skillLevel.push(this.currentSkillSet);
    this.currentSkillSet = { skillLevel: 0, skillSetId: 0 } as SeekersSkillsSet;
  }

  public SaveSkills() {
    if (this.skillLevel.length > 0)
    {
      this.skillLevel.forEach((value) => {
        value.skrId = this.cache.seekerInfo.skrId;
        value.skrCode = this.cache.seekerInfo.skrCode;
        var skillname = this.getSkillNameName(value.skillSetId);

        this.dataService.addSkillLevel(value).subscribe(data => this.toastr.success("Skill: " + skillname + " Successfully Updated"),
          err => this.toastr.error("Error: " + skillname + " : " + err));
      });
    }
  }
}
