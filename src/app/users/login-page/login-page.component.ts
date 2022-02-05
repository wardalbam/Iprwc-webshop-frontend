import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {UsersService} from "../users.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  token:string;
  constructor(private userService: UsersService) { }

  ngOnInit(): void {
  }
  onSubmitLogin(form: NgForm){
    const user_data = form.value;

    this.userService.loginUser(user_data).subscribe(
      (data) => {
        this.token = data;
      },
    (error) => {
        this.token = null;
      }
    )
  }
}
