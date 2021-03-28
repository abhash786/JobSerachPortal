import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DateOperations } from 'src/app/HelperClasses/DateOperations';
import { EducationDetail } from 'src/app/Models/EducationDetail';
import { ExprerienceDetail } from 'src/app/Models/ExperienceDetail';
import { SeekerProfile } from 'src/app/Models/SeekerProfile';
import { DataCache } from 'src/app/Services/DataCache';
import { DataService } from 'src/app/Services/DataService';

@Component({
  selector: 'app-seeker-description',
  templateUrl: './seeker-description.component.html',
  styleUrls: ['./seeker-description.component.css']
})
export class SeekerDescriptionComponent implements OnInit {

  skillSets: any[] = [];
  educations: EducationDetail[] = [];
  experience: ExprerienceDetail[] = [];
  seekerInfo: SeekerProfile = {} as SeekerProfile;

  constructor(public cache: DataCache, private dataService: DataService, private toastr: ToastrService, private router: Router) {
  }

  public updateSeekerInfo(info: SeekerProfile) {
    this.seekerInfo = info;
    /*    if (this.seekerInfo.educationDetailSkrs)
       {
         this.educations = this.seekerInfo.educationDetailSkrs;
       } else */
    this.getEducations(this.seekerInfo.skrCode);

    // if (this.seekerInfo.experienceDetailSkrs)
    // {
    //   this.experience = this.seekerInfo.experienceDetailSkrs;
    // } else
    this.getExperience(this.seekerInfo.skrCode);

    // if (this.seekerInfo.seekersSkillsSetSkrs)
    // {
    //   this.skillSets = this.seekerInfo.seekersSkillsSetSkrs;
    // } else
    this.getSkillSet(this.seekerInfo.skrCode);
  }


  ngOnInit(): void {
    if (!this.seekerInfo.hasOwnProperty("skrCode"))
      this.updateSeekerInfo(this.cache.seekerInfo);
  }

  public calculateAge(dob: string) {
    let newdob = new Date(dob);
    let timeDiff = Math.abs(Date.now() - newdob.getTime());
    let age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
    return age;
  }

  public getSkillSet(skrCode: string) {
    if (skrCode)
      this.dataService.getSkillSets(skrCode).subscribe(data => {
        this.skillSets = data;
      }, error => this.toastr.error(error));
  }

  public getEducations(skrCode: string) {
    if (skrCode)
      this.dataService.getEducations(skrCode).subscribe(data => {
        this.educations = data;
      }, error => this.toastr.error(error));
  }

  public getExperience(skrCode: string) {
    if (skrCode)
      this.dataService.getExperience(skrCode).subscribe(data => {
        this.experience = data;
      }, error => this.toastr.error(error));
  }

  public getSkillValue(level: number) {
    return level * 10;
  }

  public getDate(date: string | null) {

    if (date)
      return new Date(date).toLocaleDateString();
    //return date.split('T')[0];
    else
      return "Current";
  }

}
