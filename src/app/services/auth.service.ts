import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../services/user.model';
import { Auth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from '@angular/fire/auth';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { AuthGuard } from './auth.guard';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  user$ : Observable<User> | undefined
  constructor(private router: Router, private auth: Auth, private firestore : Firestore) {
    this.auth.onAuthStateChanged((user) => {
      console.log("Auth State Changed",user);
      if (user) {
        // Logged in
        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['/flight-info-form']);
        JSON.parse(localStorage.getItem('user')!);
        
      } else {
        // Logged out
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      } 
    });
   }

  isLoggedIn() {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null  ? true : false;
  }

  login(email: string, password: string) {
    // Perform login logic and set the login status
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // // Signed in 
        // const user = userCredential.user;
        // console.log(user);
        // // Store user in local storage
        // localStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['/flight-info-form']);
        // this.authService.login();
      }
      ) .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      } );
  }

  async signInWithGoogle(){
    const provider = new GoogleAuthProvider();
    signInWithPopup(this.auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      // Credential is null if the sign-in flow is aborted.
      if (credential === null) {
        return;
      }
      else{

      const token = credential.accessToken;
      console.log(token);
      // The signed-in user info.
      const user = result.user;
      console.log(user);
      localStorage.setItem('user', JSON.stringify(user));
      // Add user profile to database
      this.router.navigate(['/flight-info-form']);
    
      
      }
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
    
  }
      


  logout() {
    // Remove tokens and user data and set the login status to false
    localStorage.removeItem('user');
    this.auth.signOut().then(() => {
      // Sign-out successful.
      this.router.navigate(['/login']);
      console.log('Sign out successful');
    }).catch((error) => {
      // An error happened.
      console.log(error);
    });
    
    
  }
}
