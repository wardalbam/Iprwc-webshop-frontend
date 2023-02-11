import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-admin-control-center',
  templateUrl: './admin-control-center.component.html',
  styleUrls: ['./admin-control-center.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminControlCenterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
