import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EducationDetail } from 'src/app/Models/EducationDetail';
import { ExprerienceDetail } from 'src/app/Models/ExperienceDetail';
import { SeekersSkillsSet } from 'src/app/Models/SeekersSkillsSet';
import { ExperienceDetailsComponent } from 'src/app/Securities/experience-details/experience-details.component';
import { SearchInput } from '../../Models/searchinput';
import { SeekerProfile } from '../../Models/SeekerProfile';
import { DataCache } from '../../Services/DataCache';
import { DataService } from '../../Services/DataService';

@Component({
  selector: 'app-search-candidates',
  templateUrl: './search-candidates.component.html',
  styleUrls: ['./search-candidates.component.css']
})
export class SearchCandidatesComponent implements OnInit {

  public searchInput: SearchInput = {} as SearchInput;
  public seekers: SeekerProfile[] = [];
  public message: string = "";
  constructor(public cache: DataCache, private dataService: DataService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.searchInput.category = "0";
    this.searchInput.location = "0";
  }

  public searchCandidates() {
    this.message = "";

    if (this.searchInput.keyword || this.searchInput.location != "0" || this.searchInput.category != "0")
    {
      var inputs: SearchInput = {
        keyword: this.searchInput.keyword,
        location: this.searchInput.location,
        category: this.searchInput.category,
        isJob: false
      }
      if (inputs.location === "0")
        inputs.location = null;

      if (inputs.category === "0")
        inputs.category = null;

      this.dataService.searchCandidates(inputs).subscribe(data => {
        this.seekers = data.candidates;
        if (this.seekers.length > 0)
          this.message = "Candidate(s) found: " + this.seekers.length;
        else
          this.message = "No candidate found for given inputs. Kindly try different keyword";
      }, err => this.toastr.error(err));
    }
    else
    {
      this.toastr.error("Kindly provide valid inputs");
    }
  }

  public viewProfile(i: number) {
    const navigationExtras: NavigationExtras = {
      state: this.seekers[i]
    };
    this.router.navigate(['/candidateprofile'], navigationExtras);

  }

  public getDate(date: string) {
    return new
      Date(Date.parse(date)).toDateString();
  }

  public educationData(deatils: EducationDetail[]) {
    var eduData = "";
    deatils.forEach(e => {
      var name = this.cache.CourseMasters.find(x => x.courseId == e.courseId);
      if (name)
        eduData += name.courseFullName + "(" + e.courseSpecialization + ", " + e.universityBoardName + "), ";
    });
    return eduData;
  }

  public getSkills(skills: SeekersSkillsSet[]) {
    var skillsInfo = "";
    skills.forEach(e => {
      var name = this.cache.SkillsSets.find(x => x.skillSetId == e.skillSetId);
      if (name)
        skillsInfo += name.skillSetName + ", ";
    });
    return skillsInfo;
  }

  public calculateExp(exp: ExprerienceDetail[]) {
    var total = 0;
    exp.forEach(e => {
      var joining = new Date(Date.parse(e.joiningDate));
      if (e.leavingDate)
        var endDate = new Date(Date.parse(e.leavingDate));
      else
        var endDate = new Date();
      total += endDate.getFullYear() - joining.getFullYear();
    });
    return total;
  }


  public getLocation(id: number) {
    var loc = this.cache.LocationMasters.find(x => x.locationId == id);
    return loc?.city + ", " + loc?.state + ", " + loc?.country;
  }
}
