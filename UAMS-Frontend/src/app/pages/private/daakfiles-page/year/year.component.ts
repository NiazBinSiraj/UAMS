import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-year',
  templateUrl: './year.component.html',
  styleUrls: ['./year.component.scss']
})
export class YearComponent implements OnInit {
  year:string|null = "";

  months = [
    ["January", "February", "March", "April"],
    ["May", "June", "July", "August"],
    ["September", "October", "November", "December"]
  ];
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.year = this.route.snapshot.paramMap.get('year');
  }

}
