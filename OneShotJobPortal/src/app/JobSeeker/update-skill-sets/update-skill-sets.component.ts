import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SeekerProfile } from 'src/app/Models/SeekerProfile';
import { SeekersSkillsSet } from 'src/app/Models/SeekersSkillsSet';
import { DataCache } from 'src/app/Services/DataCache';
import { DataService } from 'src/app/Services/DataService';

@Component({
  selector: 'app-update-skill-sets',
  templateUrl: './update-skill-sets.component.html',
  styleUrls: ['./update-skill-sets.component.css']
})
export class UpdateSkillSetsComponent implements OnInit {

  public seekerInfo: SeekerProfile;
  public currentSkillSet: SeekersSkillsSet = { skillLevel: 0 } as SeekersSkillsSet;
  public skillLevel: SeekersSkillsSet[] = [];

  constructor(private dataService: DataService, private toastr: ToastrService, private router: Router, public cache: DataCache) {
    this.currentSkillSet.skillSetId = 0;
    this.seekerInfo = this.cache.seekerInfo;
    this.getSkillSet(this.seekerInfo.skrCode);
  }

  ngOnInit(): void {

  }

  public getSkillSet(skrCode: string) {
    this.dataService.getSkillSets(skrCode).subscribe(data => {
      this.skillLevel = data;
    }, error => this.toastr.error(error));
  }

  public deleteskill(i: number) {
    this.skillLevel.splice(i, 1);
  }

  public getSkillNameName(id: number) {
    var skill = this.cache.SkillsSets.find(x => x.skillSetId == id);
    return skill?.skillSetName;
  }

  public getSubSkillNameName(id: string) {
    var skill = this.cache.SkillsSets.find(x => x.skillSetName == id);
    return skill?.subSkilllSetName;
  }

  public AddSkill() {
    this.skillLevel.push(this.currentSkillSet);
    this.currentSkillSet = { skillLevel: 0, skillSetId: 0 } as SeekersSkillsSet;
  }

  public SaveSkills() {
    if (this.skillLevel.length > 0)
    {
      this.dataService.deleteSkillLevel(this.seekerInfo.skrId).subscribe(() => {
        this.skillLevel.forEach((value) => {
          value.skrId = this.cache.seekerInfo.skrId;
          value.skrCode = this.cache.seekerInfo.skrCode;
          var skillname = this.getSkillNameName(value.skillSetId);

          this.dataService.addSkillLevel(value).subscribe(data => this.toastr.success("Skill: " + skillname + " Successfully Updated"),
            err => this.toastr.error("Error: " + skillname + " : " + err));
        })
      }, err => this.toastr.error(err));

    }
  }
}
