import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  userForm: FormGroup;
  users: any[] = []

  constructor(private auth: AuthService, private fb: FormBuilder) { }

  ngOnInit(): void {
    // initialize mo ang form
    // get ang tanan nga registered users para ma display
    this.createForm();
    this.getUsers()
  }

  createForm() {
    this.userForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  submitRegister() {
    // kwaon mo ang value ka form, ang unod ya is email kag password lang
    // ang json-server mag POST ka gapangayu id, so, ma anu ka ?
    // ma himu ka id na generated lang, gamit lang uuidv4, ezpz
    // iattach mo ang id sa user na object so mag submit ka dapat email, password kag id
    let user = this.userForm.value;
    user.id = uuidv4();

    // after mo submit ma subscribe ka
    // ang res na pagusto ka lang na da
    // ang res na pagusto ka lang na ngalan, tawag da callback, res short for response
    // callback kay tungod after mo tawag sang registerUser may response sya nga either gamiton mo or indi
    this.auth.registerUser(user).subscribe(res => {
      console.log(res)
      this.getUsers();
      // after sng submit ma anu ka?
      // kwaon mo liwat ang users list sa localhost:3000 ezpz
    })
  }

  // ga display sng users
  getUsers() {
    this.auth.getUsers().subscribe(users => {
      this.users = users;
    })
  }

}
