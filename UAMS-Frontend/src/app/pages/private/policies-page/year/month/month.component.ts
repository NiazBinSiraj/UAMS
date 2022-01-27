import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.scss']
})
export class MonthComponent implements OnInit {

  officeType:string|null = "Policy";
  workCategory:string|null = "";
  year:string|null = "";

  months = [
    ["January", "February", "March", "April"],
    ["May", "June", "July", "August"],
    ["September", "October", "November", "December"]
  ];
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.workCategory = this.route.snapshot.paramMap.get('category');
    this.year = this.route.snapshot.paramMap.get('year');
  }

}
