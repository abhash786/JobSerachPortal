import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EmployerInfo } from 'src/app/Models/EmployerInfo';
import { DataCache } from 'src/app/Services/DataCache';
import { DataService } from 'src/app/Services/DataService';

@Component({
  selector: 'app-emp-home-left-menu',
  templateUrl: './emp-home-left-menu.component.html',
  styleUrls: ['./emp-home-left-menu.component.css']
})
export class EmpHomeLeftMenuComponent implements OnInit {

  @Output() viewChanged = new EventEmitter<string>();

  employerInfo: EmployerInfo = {} as EmployerInfo;



  constructor(public cache: DataCache, private dataService: DataService, private toastr: ToastrService) {
    this.employerInfo = this.cache.employerInfo;
  }

  ngOnInit(): void {


  }

  public NavigateView(name: string) {
    this.viewChanged.emit(name);
  }


}
