import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ValidationHelper } from 'src/app/HelperClasses/ValidationHelper';
import { SeekerProfile } from 'src/app/Models/SeekerProfile';
import { DataCache } from 'src/app/Services/DataCache';
import { DataService } from 'src/app/Services/DataService';

@Component({
  selector: 'app-seeker-registration',
  templateUrl: './seeker-registration.component.html',
  styleUrls: ['./seeker-registration.component.css']
})
export class SeekerRegistrationComponent implements OnInit {
  
  public seekerInfo: SeekerProfile = {} as SeekerProfile;
  confirmPassword: string = ""

  constructor(private toastr: ToastrService, public cache: DataCache, private service: DataService) {
    this.seekerInfo.skrTypeId = 0;
  
    this.seekerInfo.skrProfileVisibility = true;
  }

  ngOnInit(): void {

  }

  public validate() {
    if (this.seekerInfo.contactNum)
    {
      if (!ValidationHelper.validatePhoneNumber(this.seekerInfo.contactNum))
      {
        this.toastr.error('Kindly provide correct phone number!');
        return false;
      }
    }
    if (this.seekerInfo.email)
    {
      if (!ValidationHelper.validateEmail(this.seekerInfo.email))
      {
        this.toastr.error('Kindly provide correct email id!');
        return false;
      }
    }
    if (!this.seekerInfo.firstName)
    {
      this.toastr.error('First Name is required!');
      return false;
    }
    if (!this.seekerInfo.lastName)
    {
      this.toastr.error('Last Name is required!');
      return false;
    }

    if (!this.seekerInfo.password)
    {
      this.toastr.error('password is required!');
      return false;
    }

    if (this.seekerInfo.password !== this.confirmPassword)
    {
      this.toastr.error('Password and confirm password do not match!');
      return false;
    }

    if (!this.seekerInfo.email && !this.seekerInfo.contactNum && !this.seekerInfo.aadhaar)
    {
      this.toastr.error('One of email, phone or Aadhar is required!');
      return false;
    }


    return true;
  }

}
