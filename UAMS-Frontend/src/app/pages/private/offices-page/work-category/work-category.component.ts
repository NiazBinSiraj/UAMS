import { Appdata } from 'src/Appdata';
import { Works } from './../../../../models/works.model';
import { WorkService } from './../../../../services/offices/work/work.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-work-category',
  templateUrl: './work-category.component.html',
  styleUrls: ['./work-category.component.scss']
})
export class WorkCategoryComponent implements OnInit {

  requesting:boolean = false;
  officeType:string|null = "";

  newWork:Works = new Works();
  works:Works[] = [];
  distributedWorks:Works[][] = [];

  constructor(private route: ActivatedRoute, private workService:WorkService) { }

  ngOnInit(): void {
    this.newWork.title = "";
    this.officeType = this.route.snapshot.paramMap.get('id');
    this.GetAllWorks();
  }

  async GetAllWorks()
  {
    this.requesting = true;
    await this.workService.GetAll().then((res) =>{
      this.works = res;
      this.works = this.works.filter((work) =>{
        return work.type == this.officeType;
      });
      this.DistributeWorks();
      this.requesting = false;
    }).catch((err) =>{
      console.log(err);
      alert('ERROR');
      this.requesting = false;
    });
  }

  async CreateWork()
  {
    this.requesting = true;
    let body = {
      title: this.newWork.title,
      type: this.officeType
    }
    await this.workService.Create(body).then((res) =>{
      console.log(res);
      this.requesting = false;
      this.newWork.title = "";
      this.GetAllWorks();
    }).catch((err) =>{
      console.log(err);
      alert("ERROR");
      this.requesting = false;
    });
  }

  OnClickAdd()
  {
    this.CreateWork();
  }

  OnEditWork(event:any)
  {
    this.newWork.title = event.target.value;
  }
  OnClickWork(i:number, j:number)
  {
    Appdata.instance.work_id = this.distributedWorks[i][j].id;
  }

  DistributeWorks()
  {
    this.distributedWorks = [];
    let temp:Works[] = [];
    for(let i=0; i<this.works.length; i++)
    {
      if(i%4 == 0 && i != 0)
      {
        this.distributedWorks.push(temp);
        temp = [];
      }
      temp.push(this.works[i]);
    }
    if(temp.length > 0) this.distributedWorks.push(temp);
    console.log(this.distributedWorks);
  }

}
