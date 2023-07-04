import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../services/user.model';
import { Auth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from '@angular/fire/auth';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  
  user$ : Observable<User> | undefined
  constructor(private router: Router, private auth: Auth, private firestore : Firestore) {
    // Track the current authentication state (for example, after a refresh) from au
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        // Logged in
        this.loggedInSubject.next(true);
      } else {
        // Logged out
        this.loggedInSubject.next(false);
      } 
    });
    // this.user$ = this.auth.currentUser.pipe(
    //   switchMap((user) => {
    //     if (user) {
    //       // Logged in
    //       return of(user);
    //     } else {
    //       // Logged out
    //       return of(null);
    //     }
    //   } )
    // );
   }

  isLoggedIn(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }

  login(email: string, password: string) {
    // Perform login logic and set the login status
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        // Store user in local storage
        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['/flight-info-form']);
        // this.authService.login();
      }
      ) .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      } );
    this.loggedInSubject.next(true);
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
      this.loggedInSubject.next(true);
      // const userRef = collection(this.firestore, 'users');
      // var payload = {firstName: user.displayName, lastName: user.displayName, email: user.email, user};
      
      // // Serialize the payload object to firestore object
      // payload = JSON.parse(JSON.stringify(payload));
      // addDoc(userRef, payload).then(() => {
      //   console.log('User profile added');
      // }
      // ).catch((error) => {
      //   console.log(error);
      // });
    
      
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
    this.loggedInSubject.next(false);
    this.auth.signOut().then(() => {
      // Sign-out successful.
      console.log('Sign out successful');
    }).catch((error) => {
      // An error happened.
      console.log(error);
    });
    
    
  }
}
