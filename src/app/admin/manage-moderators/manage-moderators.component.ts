import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/shared/User.model';
import { UsersService } from 'src/app/users/users.service';
import {AdminService} from "../admin.service";

@Component({
  selector: 'app-manage-moderators',
  templateUrl: './manage-moderators.component.html',
  styleUrls: ['./manage-moderators.component.scss']
})
export class ManageModeratorsComponent implements OnInit {
  
  allUsersList: any[];
  filterdList: any[];
  errorOccurred = false;
  errMessage : String;
  userRole: string;

  constructor(private adminService: AdminService, private cookieService: CookieService, private routes: Router, private userService: UsersService) { }

  ngOnInit(): void {
    this.userRole = this.cookieService.get('auth-role');
    // if userrole is admin
    if(this.userRole == "ROLE_ADMIN"){
      this.getUsersAsAdmin();
    } else if(this.userRole == "ROLE_MANAGER"){
      this.getUsersAsManager();
    }
  }


  removeUser(userId : string){
    this.adminService.removeUserById(userId).subscribe(
      data => {
        this.ngOnInit();
      },
      error => {
        this.errorOccurred = true;
        this.errMessage = error.message;
      }
    );
  }

  // get users as manager
  public getUsersAsManager(){
    this.adminService.getAllUsersAsManager().subscribe(
      data => {
        this.allUsersList = data;
      },
      error => {
        this.errorOccurred = true;
        if(error.status = 403){
          this.routes.navigate(["./login"]);
          this.userService.logout();
        }
      }
    );
  }
  public getUsersAsAdmin(){
    this.adminService.getAllUsersAsAdmin().subscribe(
      data => {
        this.allUsersList = data;
      },
      error => {
        this.errorOccurred = true;
        if(error.status = 403){
          this.routes.navigate(["./login"]);
          this.userService.logout();
        }
      }
    );
  }
}
