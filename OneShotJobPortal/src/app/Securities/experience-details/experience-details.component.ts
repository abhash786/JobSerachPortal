import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ExprerienceDetail } from 'src/app/Models/ExperienceDetail';
import { SeekersSkillsSet } from 'src/app/Models/SeekersSkillsSet';
import { DataCache } from 'src/app/Services/DataCache';

@Component({
  selector: 'app-experience-details',
  templateUrl: './experience-details.component.html',
  styleUrls: ['./experience-details.component.css']
})
export class ExperienceDetailsComponent implements OnInit {


  public experienceData: ExprerienceDetail[] = [] as ExprerienceDetail[];
  public currectExperience: ExprerienceDetail = {} as ExprerienceDetail;
  public availableSecondarySkills: string[] = [];
  public currentSkillSet: SeekersSkillsSet = { skillLevel: 0 } as SeekersSkillsSet;
  public skillLevel: SeekersSkillsSet[] = [];

  constructor(private toastr: ToastrService, public cache: DataCache) { }

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

}
