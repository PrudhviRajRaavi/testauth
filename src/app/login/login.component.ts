import { Component, OnInit, inject } from '@angular/core';
// import { Auth } from '@angular/fire/auth';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Auth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from '@angular/fire/auth';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup
  signupForm!: FormGroup
  // private auth: Auth = inject(Auth);
  durationInSeconds = 5;
  constructor(private router: Router, private _snackBar: MatSnackBar, private authService: AuthService, private auth: Auth, private firestore : Firestore) { }

  ngOnInit() {
    this.createForm();
    this.registeForm();
  }
  createForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('4javier@gmail.com'),
      password: new FormControl('Test123')
    })
  }
  registeForm() {
    this.signupForm = new FormGroup({
      fname: new FormControl('', Validators.required),
      lname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      rpassword: new FormControl('', [Validators.required])

    });
  }
  onSignUpSubmit() {
    console.log(this.signupForm.value);
    const fname = this.signupForm.value.fname;
    const lname = this.signupForm.value.lname;
    const email = this.signupForm.value.email;
    const password = this.signupForm.value.password;
    const rpassword = this.signupForm.value.rpassword;
    console.log(fname, lname, email, password, rpassword);
    if (password != rpassword) {
      this._snackBar.open("Password don't match", undefined, { duration: 2000, panelClass: ['snackbar-success'] });
      return
    }
    var data = { first_name: fname, last_name: lname, email: email, password: password };
    
  }
  onSubmit() {
    console.log(this.loginForm.value);
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.authService.login(email, password);
 
  }
  signInGoogle() {
    console.log("Google");
    this.authService.signInWithGoogle();

  }


  addUserProfile(firstName : string, lastName : string, email : string, user: any){
    // Add user profile logic here
    const userRef = collection(this.firestore, 'users');
    var payload = {firstname:firstName, lastname:lastName, email:email};
    // Serialize the payload object to firestore object
    payload = JSON.parse(JSON.stringify(payload));

    addDoc(userRef, payload).then(() => {
      
      console.log('User profile added');
    }
    ).catch((error) => {
      console.log(error);
    }
    );


  }

  register( ){
    // Add register logic here with first name, last name, email, password and store
    // the user in the database
    // Register user with google auth 
    console.log(this.signupForm.value);
    const firstName = this.signupForm.value.fname;
    const lastName = this.signupForm.value.lname;
    const email = this.signupForm.value.email;
    const password = this.signupForm.value.password;
    const rpassword = this.signupForm.value.rpassword;
    // console.log(fname, lname, email, password, rpassword);
    if (password != rpassword) {
      this._snackBar.open("Password don't match", undefined, { duration: 2000, panelClass: ['snackbar-success'] });
      return
    }
    const provider = new GoogleAuthProvider();
      // Register with google auth  
      


    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        this.addUserProfile(firstName, lastName, email, user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        // ..
      });
  }


}
@Component({
  selector: 'snack-bar-component-example-snack',
  templateUrl: 'invalid.html',
  styles: [
    `
    .example-pizza-party {
      color: #626A99;
    }
  `,
  ],
})
export class PizzaPartyComponent { }
// import { Component, OnInit, inject } from '@angular/core';
// import { GoogleAuthProvider, getAuth, signInWithEmailAndPassword, signInWithPopup } from '@angular/fire/auth';
// import { Auth } from '@angular/fire/auth';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {

//   // private auth: Auth = inject(Auth);

//   login(email : string, password : string ){
//     signInWithEmailAndPassword(this.auth, email, password)
//       .then((userCredential) => {
//         // Signed in 
//         const user = userCredential.user;
//         console.log(user);
//         // ...
//       }
//       ) .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         alert(errorMessage);
//       } );

//   }
//   loginInWithGoogle(){
//     const provider = new GoogleAuthProvider();
//     signInWithPopup(this.auth, provider)
//       .then((result) => {
//         // This gives you a Google Access Token. You can use it to access the Google API.
//         const credential = GoogleAuthProvider.credentialFromResult(result);
//         // Credential is null if the sign-in flow is aborted.
//         if (credential === null) {
//           return;
//         }
//         else{

//         const token = credential.accessToken;
//         console.log(token);
//         // The signed-in user info.
//         const user = result.user;
//         console.log(user);
//         }
//         // ...
//       }).catch((error) => {
//         // Handle Errors here.
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         // The email of the user's account used.
//         const email = error.email;
//         // The AuthCredential type that was used.
//         const credential = GoogleAuthProvider.credentialFromError(error);
//         // ...
//       });

//   }
  

//   constructor(private auth: Auth) { }

//   ngOnInit(): void {
//   }

// }
