import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EmployerInfo } from 'src/app/Models/EmployerInfo';
import { DataCache } from 'src/app/Services/DataCache';
import { DataService } from 'src/app/Services/DataService';

@Component({
  selector: 'app-emp-home-description',
  templateUrl: './emp-home-description.component.html',
  styleUrls: ['./emp-home-description.component.css']
})
export class EmpHomeDescriptionComponent implements OnInit {



  skillSets: any[] = [];
  employerInfo: EmployerInfo = {} as EmployerInfo;


  constructor(public cache: DataCache, private dataService: DataService, private toastr: ToastrService) {
    this.employerInfo = this.cache.employerInfo;
  }

  ngOnInit(): void {


  }

  public getDate(date: string | null) {
    if (date)
      return date.split('T')[0];
    else
      return "";
  }
}
