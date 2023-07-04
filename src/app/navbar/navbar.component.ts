import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;

  constructor(private authService: AuthService) { }
  logout(){
    // Add logout logic here
    this.authService.logout();
  }

  ngOnInit(): void {
    
      this.isLoggedIn = this.authService.isLoggedIn();
    
  }
  
}
