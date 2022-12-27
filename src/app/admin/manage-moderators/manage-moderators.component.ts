import { Component, OnInit } from '@angular/core';
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
  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getAllUsers().subscribe(
      data => {
        this.allUsersList = data;
      },
      error => {
        this.errorOccurred = true;
        console.log("Error: " + error.message);
      }
    );
  }

  addNewManager(){

  }


  

}
