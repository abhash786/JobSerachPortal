import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JobPostActivity } from 'src/app/Models/JobPostActivity';
import { DataCache } from 'src/app/Services/DataCache';
import { DataService } from 'src/app/Services/DataService';

@Component({
  selector: 'app-job-application-history',
  templateUrl: './job-application-history.component.html',
  styleUrls: ['./job-application-history.component.css']
})
export class JobApplicationHistoryComponent implements OnInit {
  public gridApi: any;
  public gridColumnApi: any;

  public defaultColDef: any;
  public columnDefs: any;
  public rowData: JobPostActivity[] = [];

  constructor(public cache: DataCache, private dataService: DataService, private toastr: ToastrService, private router: Router) {
    this.defaultColDef = {
      initialWidth: 100,
      sortable: true,
      resizable: true,
      filter: true
    };
  }

  ngOnInit(): void {

  }

  generateColumns(data: any[]) {
    let columnDefinitions: any[] = [];

    data.map(object => {

      Object
        .keys(object)
        .map(key => {
          let mappedColumn = {
            headerName: key.toUpperCase(),
            field: key
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

    this.dataService.getAllJobsAppliedByUserId(this.cache.seekerInfo.skrId).subscribe(data => {
      this.rowData = data;
      this.columnDefs = this.generateColumns(this.rowData);
    }, err => this.toastr.error(err));
  }

}
