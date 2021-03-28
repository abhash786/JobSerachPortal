import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Console } from 'console';
import { ToastrService } from 'ngx-toastr';
import { DataCache } from 'src/app/Services/DataCache';
import { DataService } from 'src/app/Services/DataService';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {

  public username: string = "";
  public password: string = "";
  constructor(private toastr: ToastrService, private dataService: DataService, private cache: DataCache, private router: Router) {
    if (this.cache.isAuthenticated)
    {
      this.router.navigate(['/candidateprofile']);
    }
  }

  ngOnInit(): void {
  }

  public seekerLogin() {
    if (this.username && this.password)
    {
      this.dataService.login(this.username, this.password, false).subscribe(resp => {
        this.cache.login(resp.user, resp.token);
        this.router.navigate(['/candidateprofile']);
      }, (error) => {
        // Display error message
        this.toastr.error(error);
      });
    }
    else
    {
      this.toastr.error("Username and password cannot be empty.")
    }
  }

  public employerLogin() {
    if (this.username && this.password)
    {
      this.dataService.login(this.username, this.password, true).subscribe(resp => {
        this.cache.corporateLogin(resp.user, resp.token);
        this.router.navigate(['/companyprofile']);
      }, (error) => {
        // Display error message
        this.toastr.error(error);
      });
    }
    else
    {
      this.toastr.error("Username and password cannot be empty.")
    }
  }

  public nonImp() {
    this.toastr.error("This functionality is yet not implemented. Kindly contact system administrator for more info.");
  }
}
