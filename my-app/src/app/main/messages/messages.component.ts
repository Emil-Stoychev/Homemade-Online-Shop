import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit{

  public messages: any = []

  constructor(private userService: UserService, private appComponent: AppComponent) {}

  ngOnInit() {

    let token: any = localStorage.getItem('sessionStorage')
    let cookie = this.userService.jwtDecode(token)

    this.userService.getAllMessages(cookie._id).subscribe((res: any) => {
      if(!res.message) {
        console.log(res);
        

        this.messages = res
      }
    })
  }

  statusChange(e: any, messageId: any) {

    let userId = this.appComponent?.userFromToken?._id

    let data = {
      messageId,
      token: this.appComponent.sessionStorage
    }

    this.userService.updateMessageStatus(userId, data).subscribe((res: any) => {
      console.log(res);
      
    })
  }



}
