import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/shared/service/account.service';
import { ConfirmedValidator } from '../change-password/confirm-password-match';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/shared/service/service.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  constructor(private _accountService: AccountService,private formBuilder : FormBuilder,private _route : Router,private _mainService : ServiceService){}
  passwordPattern =  '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\\-_=+{}[\\]|;:\'",.<>/?]).{8,}$';
  myForm: FormGroup = new FormGroup({});
  ngOnInit(): void {
 
    this.myForm =  this.formBuilder.group({
    email: new FormControl('',[Validators.required,Validators.pattern( "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[cC][oO][mM]$" )]),
    code : new FormControl('',[Validators.required]),
    newPassword: new FormControl('',[Validators.required,Validators.pattern(this.passwordPattern)]),
    confirmPassword: new FormControl('',[Validators.required,Validators.pattern(this.passwordPattern)] ),
  },{validator : ConfirmedValidator("newPassword","confirmPassword") }
);
}


onSubmit(){
  if(this.myForm.valid){

    const data = this.myForm.value;
    this._accountService.ResetPassword(data).subscribe((response:any) =>{
     
      if(response.statusCode == 400)
      {
        console.log('error ');
        this._mainService.Toast.fire({ icon: 'error', title: response.message});
      }

      if(response.statusCode == 200)
      {
       console.log(response);
       this._mainService.Toast.fire({icon: 'success', title: 'Reset Password Successfully'});
       this._route.navigateByUrl('sign-In');
      }
    }, 

    error => { this._mainService.Toast.fire({icon: 'error', title: 'Can`t Reset Password!'}); }); }
    this.myForm.reset();
  }
}
