import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServiceService } from './service.service';
const  USER_ID = 'userId';
const USER_NAME = 'userName';
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http:HttpClient,private mainService:ServiceService,private _tokenService: TokenService) { }

  baseUrl= this.mainService.baseUrl;

  getUserId(){
    return localStorage.getItem(USER_ID);
  }

  UserInfo(userId: any){
    let headers = new HttpHeaders({"Authorization" : 'Bearer '+ this._tokenService.getToken()})
    return this.http.get(this.baseUrl+'api/UserAccount/GetUserLoginInformation?userId=' + userId,{headers});
  }
  getUserName(){
    return localStorage.getItem(USER_NAME);
  }
  ForgetPassword(email: any){
    console.log(email)
    return this.http.post(this.baseUrl+'api/UserAccount/ForgetPassword?Email='+email,'');
  }

  CreateAccount(data:any){
    debugger
   return this.http.post(this.baseUrl +'api/UserAccount/Registration',data);
  }

  ChangePassword(data:any){
    debugger
    let headers = new HttpHeaders({"Authorization" : 'Bearer '+ this._tokenService.getToken()})
    return this.http.post(this.baseUrl+'api/UserAccount/ChangePassword',data,{headers});
  }
  
  ResetPassword(data: any){
    return this.http.post(this.baseUrl+'api/UserAccount/ResetPassword',data);
  }
    Login(data:any) {
    debugger
    return this.http.post(this.baseUrl +'api/UserAccount/SignIn',data);
  }
  LogOut(){
    let headers = new HttpHeaders({"Authorization": "Bearer "+ this._tokenService.getToken()})
    return this.http.get(this.baseUrl +'api/UserAccount/SignOut',{headers,responseType: 'json'});
  }
 
}
