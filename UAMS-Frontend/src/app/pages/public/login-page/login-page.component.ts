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
    this.authService.Login(this.credential).then((res) => {
      Appdata.instance.token = res.token;
      Appdata.instance.isloggedIn = true;

      this.router.navigate(["/home"]);
    })
  }
}
