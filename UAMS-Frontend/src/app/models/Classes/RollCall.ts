export class RollCall{
    company:string = "A coy";
    officer:number = 0;
    master_warent_officer:number = 0;
    senior_warent_officer:number = 0;
    warent_officer:number = 0;
    sergent:number = 0;
    corporal:number = 0;
    lance_corporal:number = 0;
    soldier:number = 0;
    clerk:number = 0;
    cook_u:number = 0;
    cook_mess:number = 0;
    trademan:number = 0;
    nc_e:number = 0;
    nc_u:number = 0;
    songjukto:number = 0;
    rt:number = 0;
    sum:number = 0;

    constructor(_company:string = "", _officer:number = 0, _master_warent_officer:number = 0, _senior_warent_officer:number = 0, _warent_officer:number = 0, _sergent:number = 0, _corporal:number = 0, _lance_corporal:number = 0, _soldier:number = 0,_clerk:number = 0,_cook_u:number = 0,_cook_mess:number = 0,_trademan:number = 0,_nc_e:number = 0,_nc_u:number = 0,_songjukto:number = 0,_rt:number = 0)    
    {
        this.company = _company;
        this.officer = _officer;
        this.master_warent_officer = _master_warent_officer;
        this.senior_warent_officer = _senior_warent_officer;
        this.warent_officer = _warent_officer;
        this.sergent = _sergent;
        this.corporal = _corporal;
        this.lance_corporal = _lance_corporal;
        this.soldier = _soldier;
        this.clerk = _clerk;
        this.cook_u = _cook_u;
        this.cook_mess = _cook_mess;
        this.trademan = _trademan;
        this.nc_e = _nc_e;
        this.nc_u = _nc_u;
        this.songjukto = _songjukto;
        this.rt = _rt;
    }

}