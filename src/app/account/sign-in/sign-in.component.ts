import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/service/account.service';
import { ServiceService } from 'src/app/shared/service/service.service';
import { TokenService } from 'src/app/shared/service/token.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit  {

  constructor(private accountService:AccountService, private tokenService:TokenService,private Route:Router, private mainService : ServiceService,){}
  ngOnInit(): void {

    if(this.tokenService.isValidToken())
    {
        this.Route.navigateByUrl("")
     }
    }
    responseMessage="";
    loadingResponse= false

    loginData(data: any){
      this.responseMessage=''
      this.loadingResponse = true;
      this.accountService.Login(data).subscribe((res : any ) => {
        if(res.statusCode != 200){
          this.responseMessage = res.message;
         
        }
        else{
          this.tokenService.setToken(res.response.token);
          this.responseMessage = "";
          
          this.mainService.loginResponse = res;
          this.Route.navigateByUrl("dashboard");
        }
        this.loadingResponse = false;
      },(error:any)=>{
        if(error.status==0){
          this.responseMessage=''
          this.responseMessage = "Server is not responding";
          this.loadingResponse = false;
        }
      });
    }
  }


