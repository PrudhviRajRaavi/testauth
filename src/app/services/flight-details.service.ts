import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FlightDetailsService {
  constructor(private http: HttpClient, private dialog: MatDialog) {}

  submitFlightDetails(flightDetails: any): Observable<any> {
    const apiUrl = 'https://us-central1-crm-sdk.cloudfunctions.net/flightInfoChallenge'; 
    const token = 'SGV5IHRoZXJlIFBydWRodmkhICBMb29rcyBsaWtlIHlvdSBmb3VuZCBteSBsaXR0bGUgZWFzdGVyIGVnZy4gQnJpbmcgdGhpcyB1cCBpbiB0aGUgaW50ZXJ2aWV3IGZvciBib251cyBwb2ludHMh'
    // Add token to the request header
    flightDetails.token = token;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': `${token}`
    });
    return this.http.post(apiUrl, flightDetails, { headers }).pipe(
      map((response) => {
        this.openDialog(response);
        return response;
      })
    );
  }

  private openDialog(response: any): void {
    // Implement the dialog component and open the dialog here
    // You can use the MatDialog service to create and open the dialog
    this.dialog.open(DialogComponent, {
      data: response,
    });
  }
}
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html',
})
export class DialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
