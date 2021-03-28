import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmpHomeDescriptionComponent } from 'src/app/Employer/emp-home-description/emp-home-description.component';
import { EducationDetail } from 'src/app/Models/EducationDetail';
import { ExprerienceDetail } from 'src/app/Models/ExperienceDetail';
import { SeekerProfile } from 'src/app/Models/SeekerProfile';
import { SeekersSkillsSet } from 'src/app/Models/SeekersSkillsSet';
import { EducationDetailsComponent } from 'src/app/Securities/education-details/education-details.component';
import { ExperienceDetailsComponent } from 'src/app/Securities/experience-details/experience-details.component';
import { SeekerUploadComponentComponent } from 'src/app/Securities/seeker-upload-component/seeker-upload-component.component';
import { DataCache } from 'src/app/Services/DataCache';
import { DataService } from 'src/app/Services/DataService';

@Component({
  selector: 'app-update-candidate-profile',
  templateUrl: './update-candidate-profile.component.html',
  styleUrls: ['./update-candidate-profile.component.css']
})
export class UpdateCandidateProfileComponent implements OnInit {
  public seekerInfo: SeekerProfile = {} as SeekerProfile;
  public resumeFile: string = "";
  public resumeFileContent: string = "";
  skillSets: any[] = [];
  educations: EducationDetail[] = [];
  experience: ExprerienceDetail[] = [];
  public skillLevel: SeekersSkillsSet[] = [];

  @ViewChild(EducationDetailsComponent, { static: false }) eduComponent: EducationDetailsComponent;
  @ViewChild(ExperienceDetailsComponent, { static: false }) expComponent: ExperienceDetailsComponent;
  @ViewChild(SeekerUploadComponentComponent, { static: false }) uploadComponent: SeekerUploadComponentComponent;

  constructor(public cache: DataCache, private toastr: ToastrService, private router: Router, private dataService: DataService) {
    this.updateSeekerInfo(this.cache.seekerInfo);
  }

  ngOnInit(): void {
  }
  onSubmit() {
    this.dataService.UpdateSeekerInfo(this.seekerInfo).subscribe(data => {
      this.toastr.success("User info updated successfully");
      this.cache.seekerInfo = data;
    }, err => this.toastr.error(err));
  }

  public updateSeekerInfo(info: SeekerProfile) {
    this.seekerInfo = info;
  }


}
