import { Component, OnInit } from '@angular/core';
import { Appdata } from 'src/Appdata';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'UAMS';

  constructor(private router:Router) {}

  ngOnInit()
  {
    if(Appdata.instance.isloggedIn == false)
    {
      this.router.navigate(["/login"]);
    }
    else
    {
      this.router.navigate(["/home"]);
    }
  }
}
