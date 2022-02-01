import { Daakfile } from './../../../../../models/daakfile.model';
import { DaakfileService } from './../../../../../services/daakfile/daakfile.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Files } from 'src/app/models/files.model';
import { Appdata } from 'src/Appdata';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.scss']
})
export class MonthComponent implements OnInit {

  baseUrl = Appdata.instance.backendURL;
  requesting:boolean = false;

  year:string|null = "";
  month:string|null = "";
  monthCount:string = "";
  message:string = "";
  owner:string = "";
  userAppt:string = "";

  fileDay:string = "";
  
  files:Daakfile[] = [];
  days:string[] = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];
  appointments:string[] = ["DUTY CLK", "HEAD CLK", "ADJT", "QM", "A COY COMD", "B COY COMD", "C COY COMD", "D COY COMD", "HQ COY COMD", "2IC", "CO", "ADMIN"];
  newFile:Daakfile = new Daakfile();

  transferModal:boolean = false;

  selectedFileIndex:number = -1;
  selectedFileAppt:string = "DUTY CLK";
  selectedFileMessage:string = "No Message";
  
  constructor(private route: ActivatedRoute, private daakfileService:DaakfileService) { }

  ngOnInit(): void {
    this.fileDay = "01";
    this.userAppt = Appdata.instance.user.appointment;
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
      upload_date: this.year+"-"+this.monthCount+"-"+ this.fileDay,
      message: "No Message",
      owner: "DUTY CLK"
    }

    await this.daakfileService.Create(body).then((res) =>{
      console.log(res);
      this.newFile = new Daakfile();
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
    let appt = Appdata.instance.user.appointment;
    if(appt == "A COY COMD" || appt == "B COY COMD" || appt == "C COY COMD" || appt == "D COY COMD" || appt == "HQ COY COMD") appt = "COY COMD";
    else if(appt == "BB") appt = "ADMIN";

    if(appt == "ADMIN")
    {
      await this.daakfileService.GetAll(this.year, this.monthCount).then((res) =>{
        this.files = res;
        console.log(res);
        this.requesting = false;
      }).catch((err) =>{
        console.log(err);
        this.requesting = false;
        alert("ERROR");
      });
    }
    else
    {
      await this.daakfileService.Get(appt, this.year, this.monthCount).then((res) =>{
        this.files = res;
        this.requesting = false;
        this.GetFilesForEveryOne();
      }).catch((err) =>{
        console.log(err);
        this.requesting = false;
        alert("ERROR");
      });
    }
  }

  async GetFilesForEveryOne()
  {
    await this.daakfileService.Get("EVERYONE", this.year, this.monthCount).then((res) =>{
      let tempFiles:Daakfile[] = [];
      tempFiles = res;
      this.files = this.files.concat(tempFiles);
      console.log(res);
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
    await this.daakfileService.Delete(this.files[ind].id).then((res) =>{
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

  OnClickTransfer(ind:number)
  {
    this.selectedFileIndex = ind;
    this.message = this.files[ind].message;
    this.transferModal = true;
  }
  OnClickCancel()
  {
    this.transferModal = false;
  }
  async OnClickDone()
  {
    this.requesting = true;
    if(this.selectedFileAppt == Appdata.instance.user.appointment)
    {
      alert("Appointment can not be same as your appointment");
      this.requesting = false;
      return;
    }

    let appt = this.selectedFileAppt;
    if(appt == "A COY COMD" || appt == "B COY COMD" || appt == "C COY COMD" || appt == "D COY COMD" || appt == "HQ COY COMD") appt = "COY COMD";

    let body = {
      owner: appt,
      message: this.selectedFileMessage
    }
    await this.daakfileService.Update(this.files[this.selectedFileIndex].id, body).then((res) =>{
      console.log(res);
      this.requesting = false;
      this.transferModal = false;
      alert("File Transfered");
      this.GetFiles();
    }).catch((err) =>{
      console.log(err);
      this.requesting = false;
      alert("ERROR");
    });
  }

  async OnClickAvailable()
  {
    this.requesting = true;
    let body = {
      owner: "EVERYONE"
    };

    await this.daakfileService.Update(this.files[this.selectedFileIndex].id, body).then((res) =>{
      console.log(res);
      this.requesting = false;
      this.transferModal = false;
      alert("File is available for everyone.");
      this.GetFiles();
    }).catch((err) =>{
      console.log(err);
      this.requesting = false;
      alert("ERROR");
    });
  }

  OnSelectDay(event:any)
  {
    this.fileDay = event.target.value;
  }

  OnSelectAppt(event:any)
  {
    this.selectedFileAppt = event.target.value;
  }

  OnEditMessage(event:any)
  {
    this.selectedFileMessage = event.target.value;
  }

  fileChange(event:any)
  {
    let file:File = event.target.files[0];
    if(file)
    {
      this.newFile.name = file.name;
      this.newFile.file = file;
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
