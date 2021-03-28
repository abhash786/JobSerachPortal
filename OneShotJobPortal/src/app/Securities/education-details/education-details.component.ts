import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EducationDetail } from 'src/app/Models/EducationDetail';
import { DataCache } from 'src/app/Services/DataCache';

@Component({
  selector: 'app-education-details',
  templateUrl: './education-details.component.html',
  styleUrls: ['./education-details.component.css']
})
export class EducationDetailsComponent implements OnInit {


  public educationData: EducationDetail[] = [] as EducationDetail[];
  public currectEducation: EducationDetail = {} as EducationDetail;

  constructor(private toastr: ToastrService, public cache: DataCache) { }

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
}
