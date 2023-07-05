import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;

  constructor(private authService: AuthService,private dialog: MatDialog) { }
  logout(){
    // Add logout logic here
    // Invokke logout dialog component
    this.openDialog()
   
  }
  private openDialog(): void {
    // Implement the dialog component and open the dialog here
    // You can use the MatDialog service to create and open the dialog
    const dialogRef=this.dialog.open(LogoutDialogComponent, {
      
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(result){
        this.authService.logout();
      }
    });
      
  }

  ngOnInit(): void {
    
      this.isLoggedIn = this.authService.isLoggedIn();
    
  }
  
}
@Component({
  selector: 'app-logout-dialog',
  templateUrl: 'logout-dialog.html',
})
export class LogoutDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
