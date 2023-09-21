import { Injectable } from '@angular/core';
import { ServiceService } from './service.service';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class TokenService {
  token: any =null;

  helper = new JwtHelperService();
  constructor(
    private mainService:ServiceService  
  ) { }

  setToken(token: string): void {
    localStorage.setItem('token', token);
    this.token = token;
  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  clearToken(): void {
    localStorage.removeItem('token');
    this.token = null;
  }
  
  isValidToken(): boolean {
    // const decodedToken = this.helper.decodeToken(this.token);
    if (this.helper.isTokenExpired(this.getToken())) {
      return false
    } 
    else
       
        return false
     
      //return true
    }
  }
  

