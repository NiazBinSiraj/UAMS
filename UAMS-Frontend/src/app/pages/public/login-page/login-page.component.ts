import { Appdata } from 'src/Appdata';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  isLoading:boolean = false;
  
  credential = {
    email : "",
    password: ""
  }
  
  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
    if(Appdata.instance.isloggedIn)
    {
      this.router.navigate(["/home"]);
    }
  }

  OnEditEmail(event:any)
  {
    this.credential.email = event.target.value;
  }
  OnEditPassword(event:any)
  {
    this.credential.password = event.target.value;
  }
  OnClickLogin()
  {
    this.isLoading = true;
    
    this.authService.Login(this.credential).then((res) => {
      Appdata.instance.token = res.token;
      Appdata.instance.isloggedIn = true;

      Appdata.instance.user.id = res.user.id;
      Appdata.instance.user.appointment = res.user.appointment;
      Appdata.instance.user.army_number = res.user.army_number;
      Appdata.instance.user.name = res.user.name;
      Appdata.instance.user.email = res.user.email;
      Appdata.instance.user.password = res.user.password;

      console.log(Appdata.instance.user);

      this.isLoading = false;

      this.router.navigate(["/home"]);
    }).catch((err) =>{
      this.isLoading = false;
      window.alert("Wrong Credentials");
    });
  }
}
