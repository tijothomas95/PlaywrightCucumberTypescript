import { Page } from "@playwright/test";
import { inject, injectable } from "tsyringe";

@injectable()
export class ProjectContext{

    private userEmail: string;
    private userName: string;
    private userPassword: string;

    constructor(@inject('page') public page: Page){
        this.userEmail='';
        this.userName='';
        this.userPassword='';
    }

    getUserEmail(){
        return this.userEmail;
    }

    setUserEmail(email: string){
        this.userEmail=email;
    }

    getUserName(){
        return this.userName;
    }

    setUserName(name: string){
        this.userName=name;
    }

    getUserPassword(){
        return this.userPassword;
    }

    setUserPassword(password: string){
        this.userPassword=password;
    }
}