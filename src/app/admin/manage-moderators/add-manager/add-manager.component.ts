import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/users/users.service';

@Component({
  selector: 'app-add-manager',
  templateUrl: './add-manager.component.html',
  styleUrls: ['./add-manager.component.scss']
})
export class AddManagerComponent implements OnInit {

  usernameExistsError: boolean = false;
  unknownError  : boolean = false;
  constructor( private userService: UsersService, private router : Router) { }

  ngOnInit(): void {
  }

  saveManager(form: NgForm){
    this.userService.registerManager(form.value).subscribe(
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
