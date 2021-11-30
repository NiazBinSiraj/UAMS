import { Causes } from './../../../models/Classes/Causes';
import { RollCall } from './../../../models/Classes/RollCall';
import { Paradestate } from './../../../models/paradestate.model';
import { Component, OnInit } from '@angular/core';
import { ParadestateService } from 'src/app/services/paradestate/paradestate.service';

@Component({
  selector: 'app-paradestate-page',
  templateUrl: './paradestate-page.component.html',
  styleUrls: ['./paradestate-page.component.scss']
})
export class ParadestatePageComponent implements OnInit {

  isRequesting: boolean = false;
  isEdit: boolean = false;
  date: string = "";
  paradeStates: Paradestate = new Paradestate;

  total: RollCall[] = [];
  total_sum: RollCall = new RollCall;

  active: RollCall[] = [];
  active_sum: RollCall = new RollCall;

  present: RollCall[] = [];
  present_sum: RollCall = new RollCall;

  absence_sum: RollCall = new RollCall;
  absence: RollCall[] = [Object.create(RollCall), Object.create(RollCall), Object.create(RollCall), Object.create(RollCall), Object.create(RollCall), Object.create(RollCall)];

  cause_of_absence: Causes[] = [];
  cause_of_absence_sum: Causes = new Causes;

  company: string[] = ["A coy", "B coy", "C coy", "D coy", "Sadar coy", "Batt. sadar"];


  constructor(private paradestateService: ParadestateService) { }

  ngOnInit(): void {

  }

  GetParadeState() {
    this.isRequesting = true;
    this.paradestateService.Get(this.date).then((res) => {
      console.log(res);
      console.log("Data Collected");
      this.RESET_RollCall(this.total_sum);
      this.RESET_RollCall(this.active_sum);
      this.RESET_RollCall(this.present_sum);
      this.RESET_RollCall(this.absence_sum);
      this.RESET_Causes(this.cause_of_absence_sum);

      //Total
      this.total = res.total;
      for (let i = 0; i < this.total.length; i++) {
        this.SUM_RollCall(this.total[i]);
        this.total_sum.officer += this.total[i].officer;
        this.total_sum.master_warent_officer += this.total[i].master_warent_officer;
        this.total_sum.senior_warent_officer += this.total[i].senior_warent_officer;
        this.total_sum.warent_officer += this.total[i].warent_officer;
        this.total_sum.sergent += this.total[i].sergent;
        this.total_sum.corporal += this.total[i].corporal;
        this.total_sum.lance_corporal += this.total[i].lance_corporal;
        this.total_sum.soldier += this.total[i].soldier;
        this.total_sum.clerk += this.total[i].clerk;
        this.total_sum.cook_u += this.total[i].cook_u;
        this.total_sum.cook_mess += this.total[i].cook_mess;
        this.total_sum.trademan += this.total[i].trademan;
        this.total_sum.nc_e += this.total[i].nc_e;
        this.total_sum.nc_u += this.total[i].nc_u;
        this.total_sum.songjukto += this.total[i].songjukto;
        this.total_sum.rt += this.total[i].rt;
        this.total_sum.sum += this.total[i].sum;
      }

      //Active
      this.active = res.active;
      for (let i = 0; i < this.active.length; i++) {
        this.SUM_RollCall(this.active[i]);
        this.active_sum.officer += this.active[i].officer;
        this.active_sum.master_warent_officer += this.active[i].master_warent_officer;
        this.active_sum.senior_warent_officer += this.active[i].senior_warent_officer;
        this.active_sum.warent_officer += this.active[i].warent_officer;
        this.active_sum.sergent += this.active[i].sergent;
        this.active_sum.corporal += this.active[i].corporal;
        this.active_sum.lance_corporal += this.active[i].lance_corporal;
        this.active_sum.soldier += this.active[i].soldier;
        this.active_sum.clerk += this.active[i].clerk;
        this.active_sum.cook_u += this.active[i].cook_u;
        this.active_sum.cook_mess += this.active[i].cook_mess;
        this.active_sum.trademan += this.active[i].trademan;
        this.active_sum.nc_e += this.active[i].nc_e;
        this.active_sum.nc_u += this.active[i].nc_u;
        this.active_sum.songjukto += this.active[i].songjukto;
        this.active_sum.rt += this.active[i].rt;
        this.active_sum.sum += this.active[i].sum;
      }

      //Present
      this.present = res.present;
      for (let i = 0; i < this.present.length; i++) {
        this.SUM_RollCall(this.present[i]);
        this.present_sum.officer += this.present[i].officer;
        this.present_sum.master_warent_officer += this.present[i].master_warent_officer;
        this.present_sum.senior_warent_officer += this.present[i].senior_warent_officer;
        this.present_sum.warent_officer += this.present[i].warent_officer;
        this.present_sum.sergent += this.present[i].sergent;
        this.present_sum.corporal += this.present[i].corporal;
        this.present_sum.lance_corporal += this.present[i].lance_corporal;
        this.present_sum.soldier += this.present[i].soldier;
        this.present_sum.clerk += this.present[i].clerk;
        this.present_sum.cook_u += this.present[i].cook_u;
        this.present_sum.cook_mess += this.present[i].cook_mess;
        this.present_sum.trademan += this.present[i].trademan;
        this.present_sum.nc_e += this.present[i].nc_e;
        this.present_sum.nc_u += this.present[i].nc_u;
        this.present_sum.songjukto += this.present[i].songjukto;
        this.present_sum.rt += this.present[i].rt;
        this.present_sum.sum += this.present[i].sum;
      }

      //Absence
      this.CALC_Absence();

      //Cause of Absence
      this.cause_of_absence = res.cause_of_absence;
      for (let i = 0; i < this.cause_of_absence.length; i++) {
        this.SUM_Causes(this.cause_of_absence[i]);
        this.cause_of_absence_sum.sum += this.cause_of_absence[i].sum;
        this.cause_of_absence_sum.accommodation += this.cause_of_absence[i].accommodation;
        this.cause_of_absence_sum.awl += this.cause_of_absence[i].awl;
        this.cause_of_absence_sum.cadre += this.cause_of_absence[i].cadre;
        this.cause_of_absence_sum.command += this.cause_of_absence[i].command;
        this.cause_of_absence_sum.course += this.cause_of_absence[i].course;
        this.cause_of_absence_sum.dimb += this.cause_of_absence[i].dimb;
        this.cause_of_absence_sum.doctoral += this.cause_of_absence[i].doctoral;
        this.cause_of_absence_sum.entertainment = this.cause_of_absence[i].entertainment;
        this.cause_of_absence_sum.hospital += this.cause_of_absence[i].hospital;
        this.cause_of_absence_sum.join += this.cause_of_absence[i].join;
        this.cause_of_absence_sum.joining += this.cause_of_absence[i].joining;
        this.cause_of_absence_sum.osl += this.cause_of_absence[i].osl;
        this.cause_of_absence_sum.temporary += this.cause_of_absence[i].temporary;
        this.cause_of_absence_sum.weekly += this.cause_of_absence[i].weekly;
        this.cause_of_absence_sum.yearly += this.cause_of_absence[i].yearly;
      }

      //Parade State
      this.paradeStates.active = this.active;
      this.paradeStates.total = this.total;
      this.paradeStates.present = this.present;
      this.paradeStates.absence = this.absence;
      this.paradeStates.cause_of_absence = this.cause_of_absence;
      this.paradeStates.date = res.date;

      console.log(this.paradeStates);
      this.isRequesting = false;
    }).catch((err) => {
      console.log(err);
      window.alert("Not Found");
      this.isRequesting = false;
    });
  }

  SUM_RollCall(obj: RollCall) {
    obj.sum = obj.officer + obj.master_warent_officer + obj.senior_warent_officer + obj.warent_officer + obj.sergent + obj.corporal + obj.lance_corporal + obj.soldier + obj.clerk + obj.cook_u + obj.cook_mess + obj.trademan + obj.nc_e + obj.nc_u + obj.songjukto + obj.rt;
  }

  RESET_RollCall(obj: RollCall) {
    obj.officer = 0;
    obj.master_warent_officer = 0;
    obj.senior_warent_officer = 0;
    obj.warent_officer = 0;
    obj.sergent = 0;
    obj.corporal = 0;
    obj.lance_corporal = 0;
    obj.soldier = 0;
    obj.clerk = 0;
    obj.cook_u = 0;
    obj.cook_mess = 0;
    obj.trademan = 0;
    obj.nc_e = 0;
    obj.nc_u = 0;
    obj.songjukto = 0;
    obj.rt = 0;
    obj.sum = 0;
  }

  RESET_Paradestate() {
    this.paradeStates.date = "";
    this.paradeStates.total = [];
    this.paradeStates.active = [];
    this.paradeStates.present = [];
    this.paradeStates.cause_of_absence = [];
  }

  SUM_Causes(obj: Causes) {
    obj.sum = obj.accommodation + obj.awl + obj.cadre + obj.command + obj.course + obj.dimb + obj.doctoral + obj.entertainment + obj.hospital + obj.join + obj.joining + obj.osl + obj.temporary + obj.weekly + obj.yearly;
  }

  RESET_Causes(obj: Causes) {
    obj.sum = 0;
    obj.accommodation = 0;
    obj.awl = 0;
    obj.cadre = 0;
    obj.command = 0;
    obj.course = 0;
    obj.dimb = 0;
    obj.doctoral = 0;
    obj.entertainment = 0;
    obj.hospital = 0;
    obj.join = 0;
    obj.joining = 0;
    obj.osl = 0;
    obj.temporary = 0;
    obj.weekly = 0;
    obj.yearly = 0;
  }

  CALC_Absence() {
    this.absence[0].company = "A coy";
    this.absence[1].company = "B coy";
    this.absence[2].company = "C coy";
    this.absence[3].company = "D coy";
    this.absence[4].company = "Sadar coy";
    this.absence[5].company = "Batt. sadar";

    for (let i = 0; i < this.active.length; i++) {
      this.absence[i].officer = this.active[i].officer - this.present[i].officer;
      this.absence[i].master_warent_officer = this.active[i].master_warent_officer - this.present[i].master_warent_officer;
      this.absence[i].senior_warent_officer = this.active[i].senior_warent_officer - this.present[i].senior_warent_officer;
      this.absence[i].warent_officer = this.active[i].warent_officer - this.present[i].warent_officer;
      this.absence[i].sergent = this.active[i].sergent - this.present[i].sergent;
      this.absence[i].corporal = this.active[i].corporal - this.present[i].corporal;
      this.absence[i].lance_corporal = this.active[i].lance_corporal - this.present[i].lance_corporal;
      this.absence[i].soldier = this.active[i].soldier - this.present[i].soldier;
      this.absence[i].clerk = this.active[i].clerk - this.present[i].clerk;
      this.absence[i].cook_u = this.active[i].cook_u - this.present[i].cook_u;
      this.absence[i].cook_mess = this.active[i].cook_mess - this.present[i].cook_mess;
      this.absence[i].trademan = this.active[i].trademan - this.present[i].trademan;
      this.absence[i].nc_e = this.active[i].nc_e - this.present[i].nc_e;
      this.absence[i].nc_u = this.active[i].nc_u - this.present[i].nc_u;
      this.absence[i].songjukto = this.active[i].songjukto - this.present[i].songjukto;
      this.absence[i].rt = this.active[i].rt - this.present[i].rt;
      this.absence[i].sum = this.active[i].sum - this.present[i].sum;

      this.absence_sum.officer += this.absence[i].officer;
      this.absence_sum.master_warent_officer += this.absence[i].master_warent_officer;
      this.absence_sum.senior_warent_officer += this.absence[i].senior_warent_officer;
      this.absence_sum.warent_officer += this.absence[i].warent_officer;
      this.absence_sum.sergent += this.absence[i].sergent;
      this.absence_sum.corporal += this.absence[i].corporal;
      this.absence_sum.lance_corporal += this.absence[i].lance_corporal;
      this.absence_sum.soldier += this.absence[i].soldier;
      this.absence_sum.clerk += this.absence[i].clerk;
      this.absence_sum.cook_u += this.absence[i].cook_u;
      this.absence_sum.cook_mess += this.absence[i].cook_mess;
      this.absence_sum.trademan += this.absence[i].trademan;
      this.absence_sum.nc_e += this.absence[i].nc_e;
      this.absence_sum.nc_u += this.absence[i].nc_u;
      this.absence_sum.songjukto += this.absence[i].songjukto;
      this.absence_sum.rt += this.absence[i].rt;
      this.absence_sum.sum += this.absence[i].sum;
    }
  }

  OnClickSubmit() {
    this.isRequesting = true;

    //active
    this.active[0].company = "A coy";
    this.active[1].company = "B coy";
    this.active[2].company = "C coy";
    this.active[3].company = "D coy";
    this.active[4].company = "Sadar coy";
    this.active[5].company = "Batt. sadar";

    //present
    this.present[0].company = "A coy";
    this.present[1].company = "B coy";
    this.present[2].company = "C coy";
    this.present[3].company = "D coy";
    this.present[4].company = "Sadar coy";
    this.present[5].company = "Batt. sadar";

    //Cause of Absence
    this.cause_of_absence[0].company = "A coy";
    this.cause_of_absence[1].company = "B coy";
    this.cause_of_absence[2].company = "C coy";
    this.cause_of_absence[3].company = "D coy";
    this.cause_of_absence[4].company = "Sadar coy";
    this.cause_of_absence[5].company = "Batt. sadar";

    //Parade State
    this.paradeStates.date = this.date;
    this.paradeStates.total =this.total;
    this.paradeStates.active = this.active;
    this.paradeStates.present = this.present;
    this.paradeStates.cause_of_absence = this.cause_of_absence;

    console.log(this.paradeStates);

    this.paradestateService.Create(this.paradeStates).then((res) => {
      console.log(res);
      this.isRequesting = false;
      window.alert("Record saved successfully!");
    }).catch((err) => {
      console.log(err);
      this.isRequesting = false;
      window.alert("Wrong Input");
    });
  }

  OnClickViewParadeState() {
    this.GetParadeState();
  }

  OnClickView() {
    this.isEdit = false;
    this.RESET_Paradestate();
    this.RESET_RollCall(this.total_sum);
    this.RESET_RollCall(this.active_sum);
    this.RESET_RollCall(this.present_sum);
    this.RESET_RollCall(this.absence_sum);
    this.RESET_Causes(this.cause_of_absence_sum);
  }

  OnClickCreate() {
    this.GenerateTotal();
    console.log(this.total);
    //this.total = [Object.create(RollCall), Object.create(RollCall), Object.create(RollCall), Object.create(RollCall), Object.create(RollCall), Object.create(RollCall)];
    this.active = [Object.create(RollCall), Object.create(RollCall), Object.create(RollCall), Object.create(RollCall), Object.create(RollCall), Object.create(RollCall)];
    this.present = [Object.create(RollCall), Object.create(RollCall), Object.create(RollCall), Object.create(RollCall), Object.create(RollCall), Object.create(RollCall)];
    this.cause_of_absence = [Object.create(RollCall), Object.create(RollCall), Object.create(RollCall), Object.create(RollCall), Object.create(RollCall), Object.create(RollCall)];

    
    this.RESET_Paradestate();

    //for (let i = 0; i < this.total.length; i++) this.RESET_RollCall(this.total[i]);
    for (let i = 0; i < this.active.length; i++) this.RESET_RollCall(this.active[i]);
    for (let i = 0; i < this.present.length; i++) this.RESET_RollCall(this.present[i]);
    for (let i = 0; i < this.cause_of_absence.length; i++) this.RESET_Causes(this.cause_of_absence[i]);

    this.RESET_RollCall(this.total_sum);
    this.RESET_RollCall(this.active_sum);
    this.RESET_RollCall(this.present_sum);
    this.RESET_RollCall(this.absence_sum);
    this.RESET_Causes(this.cause_of_absence_sum);

    this.isEdit = true;
  }

  GenerateTotal()
  {
    this.total = [
      new RollCall("A coy", 3,0,2,2,10,12,13,91,1,5,0,0,0,0,0,0),
      new RollCall("B coy", 3,0,2,2,10,12,13,91,1,5,0,0,0,0,0,0),
      new RollCall("C coy", 3,0,2,2,10,12,13,91,1,5,0,0,0,0,0,0),
      new RollCall("D coy", 3,0,2,2,10,12,13,91,1,5,0,0,0,0,0,0),
      new RollCall("Sadar coy", 5,0,3,3,8,10,9,57,5,6,0,1,15,0,9,0),
      new RollCall("Batt. sadar", 4,1,0,1,6,4,3,18,6,0,2,0,0,4,4,1)
    ];

  }

  //Edit Active Rollcall
  OnEditActiveO(event: any, company_type: number) {
    this.active[company_type].officer = event.target.value;
  }
  OnEditActiveMWO(event: any, company_type: number) {
    this.active[company_type].master_warent_officer = event.target.value;
  }
  OnEditActiveSWO(event: any, company_type: number) {
    this.active[company_type].senior_warent_officer = event.target.value;
  }
  OnEditActiveWO(event: any, company_type: number) {
    this.active[company_type].warent_officer = event.target.value;
  }
  OnEditActiveSGT(event: any, company_type: number) {
    this.active[company_type].sergent = event.target.value;
  }
  OnEditActiveCPL(event: any, company_type: number) {
    this.active[company_type].corporal = event.target.value;
  }
  OnEditActiveLCPL(event: any, company_type: number) {
    this.active[company_type].lance_corporal = event.target.value;
  }
  OnEditActiveSLD(event: any, company_type: number) {
    this.active[company_type].soldier = event.target.value;
  }
  OnEditActiveCLRK(event: any, company_type: number) {
    this.active[company_type].clerk = event.target.value;
  }
  OnEditActiveCOOKU(event: any, company_type: number) {
    this.active[company_type].cook_u = event.target.value;
  }
  OnEditActiveCOOKMESS(event: any, company_type: number) {
    this.active[company_type].cook_mess = event.target.value;
  }
  OnEditActiveTRADEMAN(event: any, company_type: number) {
    this.active[company_type].trademan = event.target.value;
  }
  OnEditActiveNCE(event: any, company_type: number) {
    this.active[company_type].nc_e = event.target.value;
  }
  OnEditActiveNCU(event: any, company_type: number) {
    this.active[company_type].nc_u = event.target.value;
  }
  OnEditActiveSONJUKTO(event: any, company_type: number) {
    this.active[company_type].songjukto = event.target.value;
  }
  OnEditActiveRT(event: any, company_type: number) {
    this.active[company_type].rt = event.target.value;
  }

  //Edit Presenct Rollcall
  OnEditPresenceO(event: any, company_type: number) {
    this.present[company_type].officer = event.target.value;
  }
  OnEditPresenceMWO(event: any, company_type: number) {
    this.present[company_type].master_warent_officer = event.target.value;
  }
  OnEditPresenceSWO(event: any, company_type: number) {
    this.present[company_type].senior_warent_officer = event.target.value;
  }
  OnEditPresenceWO(event: any, company_type: number) {
    this.present[company_type].warent_officer = event.target.value;
  }
  OnEditPresenceSGT(event: any, company_type: number) {
    this.present[company_type].sergent = event.target.value;
  }
  OnEditPresenceCPL(event: any, company_type: number) {
    this.present[company_type].corporal = event.target.value;
  }
  OnEditPresenceLCPL(event: any, company_type: number) {
    this.present[company_type].lance_corporal = event.target.value;
  }
  OnEditPresenceSLD(event: any, company_type: number) {
    this.present[company_type].soldier = event.target.value;
  }
  OnEditPresenceCLRK(event: any, company_type: number) {
    this.active[company_type].clerk = event.target.value;
  }
  OnEditPresenceCOOKU(event: any, company_type: number) {
    this.present[company_type].cook_u = event.target.value;
  }
  OnEditPresenceCOOKMESS(event: any, company_type: number) {
    this.present[company_type].cook_mess = event.target.value;
  }
  OnEditPresenceTRADEMAN(event: any, company_type: number) {
    this.present[company_type].trademan = event.target.value;
  }
  OnEditPresenceNCE(event: any, company_type: number) {
    this.present[company_type].nc_e = event.target.value;
  }
  OnEditPresenceNCU(event: any, company_type: number) {
    this.present[company_type].nc_u = event.target.value;
  }
  OnEditPresenceSONJUKTO(event: any, company_type: number) {
    this.present[company_type].songjukto = event.target.value;
  }
  OnEditPresenceRT(event: any, company_type: number) {
    this.present[company_type].rt = event.target.value;
  }

  //Edit Cause of Absence
  OnEditYearly(event:any, company_type: number){
    this.cause_of_absence[company_type].yearly = event.target.value;
  }
  OnEditTemporary(event:any, company_type: number){
    this.cause_of_absence[company_type].temporary = event.target.temporary;
  }
  OnEditEntertainment(event:any, company_type: number){
    this.cause_of_absence[company_type].entertainment = event.target.value;
  }
  OnEditDoctoral(event:any, company_type: number){
    this.cause_of_absence[company_type].doctoral = event.target.value;
  }
  OnEditJoining(event:any, company_type: number){
    this.cause_of_absence[company_type].joining = event.target.value;
  }
  OnEditWeekly(event:any, company_type: number){
    this.cause_of_absence[company_type].weekly = event.target.value;
  }
  OnEditCourse(event:any, company_type: number){
    this.cause_of_absence[company_type].course = event.target.value;
  }
  OnEditCadre(event:any, company_type: number){
    this.cause_of_absence[company_type].cadre = event.target.value;
  }
  OnEditJoin(event:any, company_type: number){
    this.cause_of_absence[company_type].join = event.target.value;
  }
  OnEditCommand(event:any, company_type: number){
    this.cause_of_absence[company_type].command = event.target.value;
  }
  OnEditHospital(event:any, company_type: number){
    this.cause_of_absence[company_type].hospital = event.target.value;
  }
  OnEditOSL(event:any, company_type: number){
    this.cause_of_absence[company_type].osl = event.target.value;
  }
  OnEditAWL(event:any, company_type: number){
    this.cause_of_absence[company_type].awl = event.target.value;
  }
  OnEditDIMB(event:any, company_type: number){
    this.cause_of_absence[company_type].dimb = event.target.value;
  }
  OnEditAccomodation(event:any, company_type: number){
    this.cause_of_absence[company_type].accommodation = event.target.value;
  }

  OnEditDate(event: any) {
    this.date = event.target.value;
  }
}
