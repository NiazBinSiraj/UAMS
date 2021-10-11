import { Component, OnInit } from '@angular/core';
import { Appdata } from 'src/Appdata';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  isCollapsed:boolean = false;
  
  constructor(private router: Router) { }

  ngOnInit(): void {
    if(Appdata.instance.isloggedIn == false)
    {
      this.router.navigate(["/login"]);
    }
  }

  OnClickCollapse()
  {
    this.isCollapsed = true;
  }

  OnClickExpand()
  {
    this.isCollapsed = false;
  }

  OnClickLogout()
  {
    Appdata.instance.token = "";
    Appdata.instance.isloggedIn = false;
    this.router.navigate(["/login"]);
  }

}
