import { FileService } from './../../../../../../../services/offices/file/file.service';
import { Appdata } from 'src/Appdata';
import { Files } from './../../../../../../../models/files.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {

  baseUrl = Appdata.instance.backendURL;
  requesting:boolean = false;

  officeType:string|null = "";
  workCategory:string|null = "";
  year:string|null = "";
  month:string|null = "";
  monthCount:string = "";
  
  files:Files[] = [];
  newFile:Files = new Files();
  
  constructor(private route: ActivatedRoute, private fileService:FileService) { }

  ngOnInit(): void {
    this.officeType = this.route.snapshot.paramMap.get('id');
    this.workCategory = this.route.snapshot.paramMap.get('category');
    this.year = this.route.snapshot.paramMap.get('year');
    this.month = this.route.snapshot.paramMap.get('month');
    this.SetMonthCount();

    this.GetFiles();
  }

  async UploadFile()
  {
    this.requesting = true;
    let body = {
      name: this.newFile.name,
      file: this.newFile.file,
      upload_date: this.newFile.upload_date,
      work_id: this.newFile.work_id
    }
    await this.fileService.Create(body).then((res) =>{
      console.log(res);
      this.newFile.file = null;
      this.requesting = false;
      alert("File Uploaded");
      this.GetFiles();
    }).catch((err) =>{
      console.log(err);
      alert("ERROR");
      this.requesting = false;
    });
  }

  async GetFiles()
  {
    this.requesting = true;
    await this.fileService.Get(this.officeType, this.workCategory, this.year, this.monthCount).then((res) =>{
      this.files = res;
      this.requesting = false;
    }).catch((err) =>{
      console.log(err);
      this.requesting = false;
      alert("ERROR");
    });
  }

  async DeleteFile(ind:number)
  {
    this.requesting = true;
    await this.fileService.Delete(this.files[ind].id).then((res) =>{
      alert("File Deleted");
      this.requesting = false;
      this.GetFiles();
    }).catch((err) =>{
      console.log(err);
      this.requesting = false;
      alert("ERROR");
    });
  }

  OnClickUpload()
  {
    if(this.newFile.file == null)
    {
      alert("File Not Selected");
      return;
    }
    this.UploadFile();
  }

  fileChange(event:any)
  {
    let file:File = event.target.files[0];
    if(file)
    {
      this.newFile.name = file.name;
      this.newFile.file = file;
      this.newFile.upload_date = this.year+"-"+this.monthCount+"-"+ new Date().getDate().toString();
      this.newFile.work_id = Appdata.instance.work_id;
    }
  }

  SetMonthCount()
  {
    if(this.month == "January") this.monthCount = "01";
    else if(this.month == "February") this.monthCount = "02";
    else if(this.month == "March") this.monthCount = "03";
    else if(this.month == "April") this.monthCount = "04";
    else if(this.month == "May") this.monthCount = "05";
    else if(this.month == "June") this.monthCount = "06";
    else if(this.month == "July") this.monthCount = "07";
    else if(this.month == "August") this.monthCount = "08";
    else if(this.month == "September") this.monthCount = "09";
    else if(this.month == "October") this.monthCount = "10";
    else if(this.month == "November") this.monthCount = "11";
    else if(this.month == "December") this.monthCount = "12";
  }
}
