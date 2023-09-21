import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/service/account.service';
import { ServiceService } from 'src/app/shared/service/service.service';
import { ConfirmedValidator } from './confirm-password-match';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
constructor( private _accountService: AccountService,
  private _mainService: ServiceService,
  private formBuilder: FormBuilder,
  private _route: Router,){}
  passwordPattern =
    '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\\-_=+{}[\\]|;:\'",.<>/?]).{8,}$';
  myForm: FormGroup = new FormGroup({});
  userId = this._accountService.getUserId();
  userEmail: string = '';
  ngOnInit(): void {
    this.getUserInfo();

    this.myForm = this.formBuilder.group(
      {
        email: new FormControl('', [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[cC][oO][mM]$'),
        ]),
        currentPassword: new FormControl('', [
          Validators.required,
          Validators.pattern(this.passwordPattern),
        ]),
        newPassword: new FormControl('', [
          Validators.required,
          Validators.pattern(this.passwordPattern),
        ]),
        confirmPassword: new FormControl('', [
          Validators.required,
          Validators.pattern(this.passwordPattern),
        ]),
      },
      { validator: ConfirmedValidator('newPassword', 'confirmPassword') }
    );
  }

  getUserInfo() {
    this._accountService.UserInfo(this.userId).subscribe((response: any) => {
      this.userEmail = response.response.email;
      this.myForm.get('email')?.setValue(response.response.email);
    });
  }


  onSubmit(){
    if (this.myForm.valid) {
      const data = this.myForm.value;
      this._accountService.ChangePassword(data).subscribe(
        (response: any) => {
          console.log(response);
            if (response.statusCode == 200) {
              this._mainService.Toast.fire({
                icon: 'success',
                title: 'Reset Password Successfully',
              });
          } else {
            if(response.statusCode == 400) {  
              this._mainService.Toast.fire({
                icon: 'error',
                title: 'Email or Password Invalid!',
              });
            }
          }
        },
        (error) => {
          this._mainService.Toast.fire({
            icon: 'error',
            title: 'Can`t Reset Password!',
          });
        }
      );
    }

    this.myForm.reset();
  }
  }

