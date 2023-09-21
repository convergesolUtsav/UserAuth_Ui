import { Component } from '@angular/core';
import { TokenService } from '../service/token.service';
import { AccountService } from '../service/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
constructor( private tokenService: TokenService,
  private accountService: AccountService,
  private Route: Router){}


currentUserName: string | null = '';
  ErrorMessage: string | null = '';

  userName() {
    this.currentUserName = this.accountService.getUserName();
    return true;
  }
   //Show Header if user is logged in
   checkLogin() {
    return this.tokenService.isValidToken();
  }
  logout() {
    this.accountService.LogOut().subscribe((res: any) => {});
    this.Route.navigateByUrl('Sign-In');
  }
}
