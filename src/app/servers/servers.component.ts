import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: "./servers.component.html",
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowNewServer = false;
  serverCreation = 'no server was created';
  serverName = "test server";
  serverCreated = false;
  servers = ['testServer' , 'testServer 2']
  buttonClicked = false;
  ClicksLog = [];
  numberOfClicks = 0;
  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000)
  }

  ngOnInit(): void {
  }
  OnCreateServer(){
    this.serverCreated = true;
    this.servers.push(this.serverName);
    this.serverCreation = "server was created! server name is " + this.serverName;
  }
  onUpdateServerName(event: any){
    this.serverName = event.target.value;
  }
  logClick(event: any){
    this.buttonClicked = true;
    this.numberOfClicks++;
    //this.ClicksLog.push(this.numberOfClicks);
    this.ClicksLog.push(new Date())
  }
}
