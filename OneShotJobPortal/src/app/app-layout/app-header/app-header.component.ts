import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataCache } from 'src/app/Services/DataCache';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {

  constructor(public cache: DataCache, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
  }
  public logout() { this.cache.logout(true); }
}
