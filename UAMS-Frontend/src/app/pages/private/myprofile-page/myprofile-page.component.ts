import { Appdata } from './../../../../Appdata';
import { User } from './../../../models/user.model';
import { Component, HostListener, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-myprofile-page',
  templateUrl: './myprofile-page.component.html',
  styleUrls: ['./myprofile-page.component.scss']
})
export class MyprofilePageComponent implements OnInit {

  @HostListener('document:click', ['$event'])
  documentClick(event: MouseEvent) {
    if((event.target as Element).className != "panel-block" && (event.target as Element).className != "input")
    {
      this.toggleAppointment = false;
      this.toggleArmyNumber = false;
      this.toggleEmail = false;
      this.toggleName = false;

      if((event.target as Element).id != "savebutton") this.editedUser = Appdata.instance.user;
    }
  }

  user:User = new User;
  editedUser:User = new User;

  toggleAppointment:boolean = false;
  toggleName:boolean = false;
  toggleArmyNumber:boolean = false;
  toggleEmail:boolean = false;
  
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.user = {...Appdata.instance.user}
    this.editedUser = {...Appdata.instance.user}
  }

  OnClickAppointment()
  {
    this.toggleAppointment = true;
  }

  OnClickName()
  {
    this.toggleName = true;
  }

  OnClickArmyNumber()
  {
    this.toggleArmyNumber = true;
  }

  OnClickEmail()
  {
    this.toggleEmail = true;
  }

  OnEditAppointment(event:any)
  {
    this.editedUser.appointment = event.target.value;
  }

  OnEditName(event:any)
  {
    this.editedUser.name = event.target.value;
  }

  OnEditArmyNumber(event:any)
  {
    this.editedUser.army_number = event.target.value;
  }

  OnEditEmail(event:any)
  {
    this.editedUser.email = event.target.value;
  }

  OnClickSave()
  {
    let user = {}

    if(this.editedUser.appointment != Appdata.instance.user.appointment && this.editedUser.appointment != null && this.editedUser.appointment != "")
    {
      Object.assign(user, {appointment : this.editedUser.appointment});
    }
    if(this.editedUser.army_number != Appdata.instance.user.army_number && this.editedUser.army_number != null && this.editedUser.army_number != -1)
    {
      Object.assign(user, {army_number : this.editedUser.army_number});
    }
    
    if(this.editedUser.name != Appdata.instance.user.name)
    {
      Object.assign(user, {name : this.editedUser.name});
    }
    if(this.editedUser.email != Appdata.instance.user.email && this.editedUser.email != null && this.editedUser.email != "")
    {
      Object.assign(user, {email : this.editedUser.email});
    }
    

    console.log(user);
    this.userService.Update(Appdata.instance.user.id,user).then((res) => {
      Appdata.instance.user = {...this.editedUser}
      this.user = {...this.editedUser}
      alert("Updated Sucessfully");
    }).catch((err) => {
      if(err.errorr != null)
      {
        alert(err.error);
      }
    });
  }

}
