import { Component, OnInit } from '@angular/core';
import { Auth, GoogleAuthProvider, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private auth: Auth, private firestore:Firestore) { }

  addUserProfile(firstName : string, lastName : string, email : string, user: any){
    // Add user profile logic here
    const userRef = collection(this.firestore, 'users');
    const payload = {firstName, lastName, email, user};
    addDoc(userRef, payload).then(() => {
      console.log('User profile added');
    }
    ).catch((error) => {
      console.log(error);
    }
    );


  }

  register(email : string, password : string, firstName : string, lastName : string ){
    // Add register logic here with first name, last name, email, password and store
    // the user in the database
    // Register user with google auth 
    const provider = new GoogleAuthProvider();
      // Register with google auth  
      


    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        // ..
      });
  }

  ngOnInit(): void {
  }

}
