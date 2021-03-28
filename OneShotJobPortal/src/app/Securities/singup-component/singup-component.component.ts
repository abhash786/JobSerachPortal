import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataCache } from 'src/app/Services/DataCache';
import { DataService } from 'src/app/Services/DataService';
import { EmployerRegistrationComponent } from '../employer-registration/employer-registration.component';
import { SeekerRegistrationComponent } from '../seeker-registration/seeker-registration.component';

@Component({
  selector: 'app-singup-component',
  templateUrl: './singup-component.component.html',
  styleUrls: ['./singup-component.component.css']
})
export class SingupComponentComponent implements OnInit {

  options = true;

  @ViewChild(SeekerRegistrationComponent) seekerComponent: SeekerRegistrationComponent;
  @ViewChild(EmployerRegistrationComponent) employerComponent: EmployerRegistrationComponent;

  constructor(private cache: DataCache, private toastr: ToastrService, private router: Router, private dataService: DataService) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.options)
      this.registerSeeker();
    else
      this.registerEmployer();
  }

  registerSeeker() {
    if (!this.seekerComponent.validate())
      return;

    this.dataService.createSeekerProfile(this.seekerComponent.seekerInfo).subscribe(data => {
      this.toastr.success("user created successfully. Redirectin to additional info page...");
      this.cache.login(data.user, data.token);

      const navigationExtras: NavigationExtras = {
        state: this.seekerComponent.seekerInfo
      };
      this.router.navigate(['/seekeraddtionaldetails'], navigationExtras);
    }, error => this.toastr.error(error));
    /*  this.seekerComponent.seekerInfo.skrTypeId = 1;
 
       this.dataService.createIndividualUser(this.seekerComponent.seekerInfo).subscribe(x => {
         this.toastr.success("User registered successfully!");
         this.router.navigate(['/individualuseraddtionaldetails']);
       }, error => this.toastr.error(error));
       this.toastr.success("We are registering you with us. Please wait..."); */
  }

  registerEmployer() {
    if (!this.employerComponent.validate())
      return;

    this.dataService.createCorporateUser(this.employerComponent.employerInfo).subscribe(data => {
      this.toastr.success("Employer registered successfully.")
      this.cache.corporateLogin(data.user, data.token);
      const navigationExtras: NavigationExtras = {
        state: this.cache.employerInfo
      };
      this.router.navigate(['/employeraddtionaldetails'], navigationExtras);
    }, err => this.toastr.error(err));

  }
}