import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EducationDetail } from 'src/app/Models/EducationDetail';
import { SeekerProfile } from 'src/app/Models/SeekerProfile';
import { DataCache } from 'src/app/Services/DataCache';
import { DataService } from 'src/app/Services/DataService';

@Component({
  selector: 'app-update-education',
  templateUrl: './update-education.component.html',
  styleUrls: ['./update-education.component.css']
})
export class UpdateEducationComponent implements OnInit {


  public educationData: EducationDetail[] = [] as EducationDetail[];
  public currectEducation: EducationDetail = {} as EducationDetail;
  seekerInfo: SeekerProfile = {} as SeekerProfile;

  constructor(private toastr: ToastrService, public cache: DataCache, private dataService: DataService) {
    this.seekerInfo = this.cache.seekerInfo;
    this.getEducations(this.seekerInfo.skrCode);
  }

  ngOnInit(): void {
    this.currectEducation.courseId = 0;
  }

  public addEducation() {
    if (this.currectEducation.courseId && this.currectEducation.courseSpecialization
      && this.currectEducation.instituteName
      && this.currectEducation.universityBoardName && this.currectEducation.courseStartDate && this.currectEducation.courseCompletionDate
      && this.currectEducation.percentageOrCgpa)
    {
      this.educationData.push(this.currectEducation);
      this.currectEducation = {} as EducationDetail;
      this.currectEducation.courseId = 0;
    }
    else
    {
      this.toastr.error("Kindly provide the correct details...");
    }
  }

  public getCourseName(id: any) {
    return this.cache.CourseMasters.find(x => x.courseId == id)?.courseFullName;
  }

  public deleteEducation(row: EducationDetail) {
    const index = this.educationData.indexOf(row);
    this.educationData.splice(index, 1);
  }

  public getEducations(skrCode: string) {
    this.dataService.getEducations(skrCode).subscribe(data => {
      this.educationData = data;
    }, error => this.toastr.error(error));
  }

  onSubmit() {
    this.dataService.deleteEducation(this.seekerInfo.skrId).subscribe(data => {
      if (this.educationData.length > 0)
      {
        this.educationData.forEach((value) => {
          value.id = 0;
          value.skrId = this.seekerInfo.skrId;
          value.skrCode = this.seekerInfo.skrCode;
        });
        this.dataService.addEductionDetails(this.educationData).subscribe(edu => {
          this.toastr.success("Education updated successfully")
        }, error => this.toastr.error("an error while updating Education details... " + error));
      }
    }, err => this.toastr.error(err))
  }
}
