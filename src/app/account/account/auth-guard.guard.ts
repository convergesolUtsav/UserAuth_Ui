import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ServiceService } from 'src/app/shared/service/service.service';
import { TokenService } from 'src/app/shared/service/token.service';



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private token: TokenService,
    private mainService:ServiceService
  ) {}

  canActivate(): any {
    if (this.token.isValidToken()) {
        this.router.navigateByUrl('/Sign-In');
        this.mainService.Toast.fire({icon:"info",title:"Please Login"})
        return false; // Prevent access
    
    } else {
        this.mainService.Toast.fire({icon:"error",title:"Please Login"})
    }
  }

 
  
}
