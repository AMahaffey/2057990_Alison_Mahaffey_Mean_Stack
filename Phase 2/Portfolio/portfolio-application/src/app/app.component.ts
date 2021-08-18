import { Component } from '@angular/core';
import { CheckboxControlValueAccessor,FormControl,FormGroup,Validators } from '@angular/forms';
import { User } from './user';
import { Contact } from './contact'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'portfolio-application';

  isShowLoginDivIf = true;
  isShowSignupDivIf = false;
  isShowPortfolioDivIf = false;
  msg:string=""
  users:Array<User>=new Array();
  contactList:Array<Contact>=new Array();

  toggleDisplayLogin() {
    this.isShowLoginDivIf = !this.isShowLoginDivIf;
    this.isShowSignupDivIf = false;
    this.isShowPortfolioDivIf = false;
    this.msg = "";
  }
  toggleDisplaySignup() {
    this.isShowSignupDivIf = !this.isShowSignupDivIf;
    this.isShowLoginDivIf = false;
    this.isShowPortfolioDivIf = false;
  }
  toggleDisplayPortfolio() {
    this.isShowPortfolioDivIf = !this.isShowPortfolioDivIf;
    this.isShowSignupDivIf = false;
    this.isShowLoginDivIf = false;
  }

  loginRef = new FormGroup({
    user:new FormControl("",[Validators.required]),
    pass:new FormControl("",[Validators.required])
  })
  // constructor() { }

  // ngOnInit(): void {
  // }
  checkUser() {
    let login = this.loginRef.value
    let loggedIn = false;
    for(let i = 0; i < this.users.length; i++){
      if(login.user==this.users[i].userName && login.pass==this.users[i].password){
        this.msg = "Sucessful Login"
        this.toggleDisplayPortfolio();
        loggedIn = true;
        break;
      }
    }
    if (loggedIn == false){
      this.msg = "Failed to Login. Please Try Again."
    }
    this.loginRef.reset();
  }

  userRef = new FormGroup({
    first:new FormControl(""),
    last:new FormControl(""),
    userN:new FormControl (""),
    pwd:new FormControl("")
  })
  addNewUser(){
    let user = this.userRef.value
    let newUser = new User(user.first,user.last,user.userN,user.pwd);
    this.users.push(newUser);
    console.log(this.users);
    this.userRef.reset();
  }

  contactRef = new FormGroup({
    name:new FormControl(""),
    numb:new FormControl("")
  })
  addContact(){
    let contact = this.contactRef.value;
    let newContact = new Contact(contact.name,contact.numb);
    this.contactList.push(newContact);
    console.log(this.contactList);
    this.contactRef.reset();
  }
}
