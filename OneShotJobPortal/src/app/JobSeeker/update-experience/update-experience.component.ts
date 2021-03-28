import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ExprerienceDetail } from 'src/app/Models/ExperienceDetail';
import { SeekerProfile } from 'src/app/Models/SeekerProfile';
import { SeekersSkillsSet } from 'src/app/Models/SeekersSkillsSet';
import { DataCache } from 'src/app/Services/DataCache';
import { DataService } from 'src/app/Services/DataService';

@Component({
  selector: 'app-update-experience',
  templateUrl: './update-experience.component.html',
  styleUrls: ['./update-experience.component.css']
})
export class UpdateExperienceComponent implements OnInit {



  public experienceData: ExprerienceDetail[] = [] as ExprerienceDetail[];
  public currectExperience: ExprerienceDetail = {} as ExprerienceDetail;
  public availableSecondarySkills: string[] = [];
  public currentSkillSet: SeekersSkillsSet = { skillLevel: 0 } as SeekersSkillsSet;
  public skillLevel: SeekersSkillsSet[] = [];
  skillSets: any[] = [];
  seekerInfo: SeekerProfile = {} as SeekerProfile;

  constructor(private toastr: ToastrService, public cache: DataCache, private dataService: DataService) {
    this.seekerInfo = this.cache.seekerInfo;
    this.getSkillSet(this.seekerInfo.skrCode);
    this.getExperience(this.seekerInfo.skrCode);
  }

  ngOnInit(): void {
    this.currectExperience.primarySkill = 0;
  }


  public addExperience() {
    if (this.currectExperience.jobTitle
      && this.currectExperience.joiningDate
      && this.currectExperience.empName
      && this.currectExperience.jobCity
      && this.currectExperience.jobState
      && this.currectExperience.jobProjectDesc)
    {
      if ((this.currectExperience.leavingDate && !this.currectExperience.isCurrentJob)
        || (!this.currectExperience.leavingDate && this.currectExperience.isCurrentJob))
      {
        this.experienceData.push(this.currectExperience);
        this.currentSkillSet.skillSetId = this.currectExperience.primarySkill;
        this.skillLevel.push(this.currentSkillSet);

        this.currentSkillSet = { skillLevel: 0 } as SeekersSkillsSet;
        this.currectExperience = { primarySkill: 0, isCurrentJob: false } as ExprerienceDetail;
        this.currectExperience.primarySkill = 0;
      }
      else
        this.toastr.error("End Date and current job cannot exist at the same time.");
    }
    else
    {
      this.toastr.error("Kindly provide the correct details...");
    }
  }

  public deleteExperience(row: ExprerienceDetail, i: number) {
    var index = this.experienceData.indexOf(row);
    this.experienceData.splice(index, 1);

    this.skillLevel.splice(i, 1);
  }

  public getSkillNameName(id: number) {
    return this.cache.SkillsSets.find(x => x.skillSetId == id)?.skillSetName;
  }

  public getSubSkillNameName(id: string) {
    return this.cache.SkillsSets.find(x => x.skillSetName == id)?.subSkilllSetName;
  }

  public primarySkillChanged() {
    return this.cache.SkillsSets.find(x => x.skillSetId == this.currectExperience.primarySkill)?.subSkilllSetName;

  }

  public getSkillSet(skrCode: string) {
    this.dataService.getSkillSets(skrCode).subscribe(data => {
      this.skillSets = data;
    }, error => this.toastr.error(error));
  }

  public getExperience(skrCode: string) {
    this.dataService.getExperience(skrCode).subscribe(data => {
      this.experienceData = data;
    }, error => this.toastr.error(error));
  }

  onSubmit() {
    var id = this.seekerInfo.skrId;
    this.dataService.deleteExperience(id).subscribe(data => {
      if (this.experienceData.length > 0)
      {
        this.experienceData.forEach((value) => {
          value.id = 0;
          value.skrId = this.seekerInfo.skrId;
          value.skrCode = this.seekerInfo.skrCode;
          value.skrTypeId = this.seekerInfo.skrTypeId;

        });
        this.dataService.addExperienceDetails(this.experienceData).subscribe(edu => {
          this.toastr.success("experience updated successfully")
        }, error => this.toastr.error("an error while updating Education details... " + error));
      }
    }, err => this.toastr.error(err))
  }
}
