import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/shared/service/account.service';
import { ServiceService } from 'src/app/shared/service/service.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;

  constructor(private fb: FormBuilder,private _accountService: AccountService,private _mainService : ServiceService) { }
 
  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      userName: ['', [Validators.required]],
      firstName:['',[Validators.required]],
      lastName : ['',[Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      Password: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      address:[[]],
      role :['admin'] 
    });
  }
  responseMessage="";
  onSubmit(){
    
    if(this.registrationForm.valid){
      //console.log(this.lists);
      const data = this.registrationForm.value;
      this._accountService.CreateAccount(data).subscribe((response : any) =>{
        console.log(response);
  
        if(response.statusCode == 400)
        {
          this._mainService.Toast.fire({ icon: 'error',title: response.message});
        }
        if(response.statusCode == 200)
        {
          this._mainService.Toast.fire({ icon: 'success',title: response.message});
        }
  
      },error => {
        console.log("Error Occured");
        this._mainService.Toast.fire({icon: 'error', title: 'User Can`t Added!'});
    });
      
      this.registrationForm.reset();
  
    }
  }
 }
