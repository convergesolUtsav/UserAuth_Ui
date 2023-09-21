import { Component } from '@angular/core';
import { TokenService } from './shared/service/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private tokenService:TokenService){}
  title = 'UserAuth_Ui';

  checkLogin() {
    return this.tokenService.isValidToken();
  }
}
