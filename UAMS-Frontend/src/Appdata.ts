import { User } from "./app/models/user.model";

export class Appdata{
    public static instance = new Appdata;

    //backendURL:string = "https://uams-app.herokuapp.com";
    backendURL:string = "http://127.0.0.1:8000";
    token:string = "";

    isloggedIn:boolean = false;

    user:User = new User;

    //Files
    work_id:number = -1;
}