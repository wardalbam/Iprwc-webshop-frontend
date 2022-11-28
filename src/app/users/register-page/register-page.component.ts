import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {UsersService} from "../users.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  constructor(private userService: UsersService, private router : Router) { }

  ngOnInit(): void {
  }

  saveUser(form: NgForm){
    console.log(form.value);
    this.userService.registerUser(form.value).subscribe(
      (data) => {
          this.router.navigate(['/login']);
          console.log(data);
      },
      (error) => {
        console.log(error);
      }
    )
  }
}
