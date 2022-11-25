import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {UsersService} from "../users.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  token:string;
  loginError: boolean;
  constructor(private userService: UsersService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }
  onSubmitLogin(form: NgForm){

    this.userService.login(form.value).subscribe(
      (data) => {
        this.userService.saveToken(data.access_token);
        this.loginError = false;
        this.userService.setLoggedIn();
        this.router.navigate(['admin/manage/mods'])
        this.token = data;
        form.resetForm();
        console.log(data);
      },
    (error) => {
        this.token = null;
      }
    )
  }
}
