import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlightDetailsService } from '../services/flight-details.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-flight-info-form',
  templateUrl: './flight-info-form.component.html',
  styleUrls: ['./flight-info-form.component.scss']
})
export class FlightInfoFormComponent implements OnInit {

  flightDetailsForm: FormGroup;
  user:any;
  constructor(private fb: FormBuilder, private flightDetailsService: FlightDetailsService,private authService: AuthService) {
    
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
      // Extract First Name , Last Name, Email, Photo URL from user object
      this.user = {
        displayName: this.user.displayName,
        email: this.user.email,
        photoURL: this.user.photoURL
      };

    }
    this.flightDetailsForm = this.fb.group({
      airline: ['', Validators.required],
      arrivalDate: ['', Validators.required],
      arrivalTime: ['', Validators.required],
      flightNumber: ['', Validators.required],
      numOfGuests: ['', Validators.required],
      comments: [''],
    });
  }

  submitForm() {
    if (this.flightDetailsForm.valid) {
      // console.log(this.flightDetailsForm.value);
      const flightDetails = this.flightDetailsForm.value;
      this.flightDetailsService
        .submitFlightDetails(flightDetails)
        .subscribe((response) => {
          console.log(response);
        });
    }
  }

  ngOnInit(): void {
  }
  onDestroy() {
    localStorage.removeItem('user');
    this.authService.logout();
  }

}
