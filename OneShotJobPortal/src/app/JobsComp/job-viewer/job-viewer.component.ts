import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployerInfo } from 'src/app/Models/EmployerInfo';
import { JobPostActivity } from 'src/app/Models/JobPostActivity';
import { DataCache } from 'src/app/Services/DataCache';
import { DataService } from 'src/app/Services/DataService';

@Component({
  selector: 'app-job-viewer',
  templateUrl: './job-viewer.component.html',
  styleUrls: ['./job-viewer.component.css']
})
export class JobViewerComponent implements OnInit {

  public gridApi: any;
  public gridColumnApi: any;
  employerInfo: EmployerInfo = {} as EmployerInfo;
  public defaultColDef: any;
  public columnDefs: any;
  public rowData: JobPostActivity[] = [];
  frameworkComponents: any;
  public jobId: number = 0;

  constructor(public cache: DataCache, private dataService: DataService, private toastr: ToastrService, private router: Router) {
    this.defaultColDef = {
      initialWidth: 100,
      sortable: true,
      resizable: true,
      filter: true
    };
    this.employerInfo = this.cache.employerInfo;
  }

  ngOnInit(): void {

  }

  generateColumns(data: any[]) {
    let columnDefinitions: any[] = [];

    data.map(object => {

      Object
        .keys(object)
        .map(key => {
          let mappedColumn;
          if (key.toUpperCase().indexOf("ApllicantName".toUpperCase()) != -1)
          {
            mappedColumn = {
              headerName: key.toUpperCase(),
              field: key,
              cellRenderer: function (params: { value: string; }) {
                // below line is just to create empty without any action hyperlink
                // to trick the user, but actual action happen onViewCellCliced() // function
                return '<a href=#>' + params.value + '</a>';
              }
            }
          }
          else 
          {
            mappedColumn = {
              headerName: key.toUpperCase(),
              field: key
            }
          }
          columnDefinitions.push(mappedColumn);
        })
    })
    //Remove duplicate columns
    columnDefinitions = columnDefinitions.filter((column, index, self) =>
      index === self.findIndex((colAtIndex) => (
        colAtIndex.field === column.field
      ))
    )

    return columnDefinitions;
  }



  onGridReady(params: { api: any; columnApi: any; }) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
    if (this.jobId != 0)
    {
      this.dataService.getJobActivitiesByCompanyId(this.employerInfo.empId, this.jobId).subscribe(data => {
        this.rowData = data;
        this.columnDefs = this.generateColumns(this.rowData);
      }, err => this.toastr.error(err));
    } else
    {
      this.dataService.getAllJobsAppliedByCompanyId(this.employerInfo.empId).subscribe(data => {
        this.rowData = data;
        this.columnDefs = this.generateColumns(this.rowData);
      }, err => this.toastr.error(err));
    }

  }
}
