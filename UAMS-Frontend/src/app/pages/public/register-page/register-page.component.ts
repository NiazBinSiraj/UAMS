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

  isLoading:boolean = false;
  user:User = new User;
  appointments:string[] = ["DUTY CLK", "HEAD CLK", "ADJT", "QM", "A COY COMD", "B COY COMD", "C COY COMD", "D COY COMD", "HQ COY COMD", "2IC", "CO", "ADMIN"];
  status:string = "OK";
  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
    if(Appdata.instance.isloggedIn)
    {
      this.router.navigate(["/home"]);
    }
    else
    {
      this.user.appointment = "DUTY CLK";
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
    if(this.user.appointment == "")
    {
      this.status = "APPT";
      return;
    }
    else if(this.user.army_number == -1 || this.user.army_number.toString() == "")
    {
      this.status = "ARMYN";
      return;
    }
    else if(this.user.name == "")
    {
      this.status = "NAME";
      return;
    }
    else if(this.user.email == "")
    {
      this.status = "EMAIL";
      return;
    }
    else if(this.user.password == "")
    {
      this.status = "PASS";
      return;
    }
    else this.status = "OK";
    
    
    this.isLoading = true;
    
    let content = {
      "appointment": this.user.appointment,
      "army_number": this.user.army_number,
      "name": this.user.name,
      "email": this.user.email,
      "password": this.user.password
    };
    console.log(content);
    this.authService.Register(content).then((res) => {
      this.user = new User();
      Appdata.instance.token = res.token;
      this.isLoading = false;
      this.router.navigate(['/login']);
    }).catch((err) => {
      this.isLoading = false;
      window.alert("Wrong Credentials");
    });
  }

}
