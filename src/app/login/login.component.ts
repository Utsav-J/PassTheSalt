import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PasswordManagerService } from '../password-manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginError : boolean = false;
  constructor(private passwordManagerService: PasswordManagerService, private router : Router){}
  loginUser(values:{email:string, password:string}){
    this.passwordManagerService.login(values.email, values.password)
    .then(
      ()=>{
        this.router.navigate(['/site-list'])
        // console.log('Login Success');
      }
    )
    .catch(
      err => {
        this.loginError=true;
        console.log(err);
      }
    );
  }
}