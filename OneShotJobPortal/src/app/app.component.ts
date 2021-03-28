import { Component, HostListener, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { VersionCheckService } from './Services/version-check.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private versionCheckService: VersionCheckService) { }


  ngOnInit(): void {
    this.versionCheckService.initVersionCheck(environment.versionCheckURL);
  }
  title = 'OneShotJobPortal';
  @HostListener("window:onbeforeunload", ["$event"])
  clearLocalStorage(event: any): void {
    localStorage.clear();
  }
}
