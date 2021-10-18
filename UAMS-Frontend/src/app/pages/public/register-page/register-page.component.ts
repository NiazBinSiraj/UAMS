import { Appdata } from 'src/Appdata';
import { User } from './../../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  user:User = new User;
  
  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
    if(Appdata.instance.isloggedIn)
    {
      this.router.navigate(["/home"]);
    }
  }

  OnEditAppointment(event:any){
    this.user.appointment = event.target.value;
  }

  OnEditArmyNumber(event:any){
    this.user.army_number = event.target.value;
  }

  OnEditName(event:any){
    this.user.name = event.target.value;
  }

  OnEditEmail(event:any){
    this.user.email = event.target.value;
  }

  OnEditPassword(event:any){
    this.user.password = event.target.value;
  }

  OnClickRegister()
  {
    let content = {
      "appointment": this.user.appointment,
      "army_number": this.user.army_number,
      "name": this.user.name,
      "email": this.user.email,
      "password": this.user.password
    };
    console.log(content);
    this.authService.Register(content).then((res) => {
      Appdata.instance.token = res.token;
      this.router.navigate(['/login']);
    }).catch((err) => {
      alert("Wrong Credentials");
    });
  }

}
