import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-year',
  templateUrl: './year.component.html',
  styleUrls: ['./year.component.scss']
})
export class YearComponent implements OnInit {

  officeType:string|null = "";
  workCategory:string|null = "";

  years = [
    ["2017", "2018", "2019", "2020"],
    ["2021", "2022", "2023", "2024"]
  ];
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.officeType = this.route.snapshot.paramMap.get('id');
    this.workCategory = this.route.snapshot.paramMap.get('category');
  }

}
