import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {UsersService} from "../users.service";
import {Router} from "@angular/router";
import { UserRegisterForm } from 'src/app/shared/UserRegisterForm.model';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  usernameExistsError: boolean = false;
  unknownError: boolean = false;
  constructor(private userService: UsersService, private router : Router) { }

  ngOnInit(): void {
  }

  saveUser(form: NgForm){
    this.userService.registerUser(form.value).subscribe(
      (data) => {
          this.router.navigate(['/login']);
          console.log(data);
      },
      (error) => {
        console.log(error);
        // if error status = CONFLICT (409)
        if(error.status == 409){
          this.usernameExistsError = true;
        }else{
          this.unknownError = true;
        }
      }
    )
  }
}
