import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/shared/User.model';
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

  constructor(private adminService: AdminService, private cookieService: CookieService) { }

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
        console.log("Error: " + error.message);
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
        console.log("Error: " + error.message);
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
        console.log("Error: " + error.message);
      }
    );
  }
}
