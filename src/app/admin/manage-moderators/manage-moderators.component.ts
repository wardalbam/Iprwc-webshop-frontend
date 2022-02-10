import { Component, OnInit } from '@angular/core';
import {AdminService} from "../admin.service";

@Component({
  selector: 'app-manage-moderators',
  templateUrl: './manage-moderators.component.html',
  styleUrls: ['./manage-moderators.component.css']
})
export class ManageModeratorsComponent implements OnInit {
  usersList : any[];
  errorOccurred = false;
  errMessage : String;
  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getAllUsers().subscribe(
      data => {
        this.usersList = data;
      },
      error => {
        this.errorOccurred = true;
        console.log(error);
      }
    );
  }
}
