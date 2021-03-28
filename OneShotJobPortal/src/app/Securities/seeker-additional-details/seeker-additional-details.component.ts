import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ValidationHelper } from 'src/app/HelperClasses/ValidationHelper';
import { EducationDetail } from 'src/app/Models/EducationDetail';
import { ExprerienceDetail } from 'src/app/Models/ExperienceDetail';
import { SeekerProfile } from 'src/app/Models/SeekerProfile';
import { DataCache } from 'src/app/Services/DataCache';
import { DataService } from 'src/app/Services/DataService';
import { EducationDetailsComponent } from '../education-details/education-details.component';
import { ExperienceDetailsComponent } from '../experience-details/experience-details.component';

@Component({
  selector: 'app-seeker-additional-details',
  templateUrl: './seeker-additional-details.component.html',
  styleUrls: ['./seeker-additional-details.component.css']
})
export class SeekerAdditionalDetailsComponent implements OnInit {


  @ViewChild(EducationDetailsComponent) educationComponent: EducationDetailsComponent;
  @ViewChild(ExperienceDetailsComponent) experienceComponent: ExperienceDetailsComponent;
  public seekerInfo: SeekerProfile = {} as SeekerProfile;
  public resumeFile: string = "";
  public resumeFileContent: string = "";

  constructor(public cache: DataCache, private toastr: ToastrService, private router: Router, private dataService: DataService) {
    const navigation = this.router.getCurrentNavigation();
    if (!navigation)
    {
      this.toastr.error("you cannot view Additional Info page. Redirected to signup page...");
      this.router.navigate(['/signup']);
    }
    else
    {
      var user = navigation.extras.state as SeekerProfile;
      if (user)
      {
        this.seekerInfo = user;
      }
      else
      {
        this.seekerInfo = this.cache.seekerInfo;
      }

      this.seekerInfo.skrProfileVisibility = true;
    }
  }

  ngOnInit(): void {

  }

  public onSubmit() {
    if (this.seekerInfo.altContactNum)
    {
      if (!ValidationHelper.validatePhoneNumber(this.seekerInfo.altContactNum))
      {
        this.toastr.error('Kindly provide correct alternate phone number!');
        return false;
      }
    }
    this.dataService.UpdateSeekerInfo(this.seekerInfo).subscribe(data => {
      this.cache.seekerInfo = data;
      if (this.educationComponent.educationData.length > 0)
      {
        this.educationComponent.educationData.forEach((value) => {
          value.skrId = this.seekerInfo.skrId;
          value.skrCode = this.seekerInfo.skrCode;
        });
        this.dataService.addEductionDetails(this.educationComponent.educationData).subscribe(edu => {
        }, error => this.toastr.error("an error while updating Education details... " + error));
      }

      if (this.experienceComponent.experienceData.length > 0)
      {
        this.experienceComponent.experienceData.forEach((value) => {
          value.skrId = this.seekerInfo.skrId;
          value.skrCode = this.seekerInfo.skrCode;
          value.skrTypeId = this.seekerInfo.skrTypeId;

        });
        this.dataService.addExperienceDetails(this.experienceComponent.experienceData).subscribe(exp => {
        }, error => this.toastr.error("an error while updating Education details... " + error))
      }

      this.router.navigate(['/upload']);
    }, error => this.toastr.error(error));
    return true;
  }
}
