import { User } from "./app/models/user.model";

export class Appdata{
    public static instance = new Appdata;

    backendURL:string = "http://192.168.0.116:8000";
    token:string = "";

    isloggedIn:boolean = false;

    user:User = new User;
}