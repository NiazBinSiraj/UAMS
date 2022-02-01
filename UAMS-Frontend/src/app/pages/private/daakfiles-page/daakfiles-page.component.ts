import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-daakfiles-page',
  templateUrl: './daakfiles-page.component.html',
  styleUrls: ['./daakfiles-page.component.scss']
})
export class DaakfilesPageComponent implements OnInit {


  years = [
    ["2017", "2018", "2019", "2020"],
    ["2021", "2022", "2023", "2024"]
  ];
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
