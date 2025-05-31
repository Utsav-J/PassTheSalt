import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PasswordManagerService } from '../password-manager.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import {AES, enc} from 'crypto-js';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-password-list',
  imports: [FormsModule, CommonModule, NavbarComponent],
  templateUrl: './password-list.component.html',
  styleUrl: './password-list.component.css'
})
export class PasswordListComponent {
  siteId!:string;
  siteURL!:string;
  siteImageURL!:string;
  siteName!:string;
  
  passwordList$ !: Observable<Array<any>>;

  enteredEmail !: string;
  enteredUsername !: string;
  enteredPassword !: string;
  currentPasswordId !: string;
  formState:string = 'Add New'; 

  successfulOperation:boolean = false;
  successMessage!:string;

  constructor(private route: ActivatedRoute, private passwordService : PasswordManagerService){
    this.route.queryParams.subscribe(
      (val:any)=>{
        this.siteId = val.id;
        this.siteImageURL = val.siteImageURL;
        this.siteURL = val.siteURL;
        this.siteName = val.siteName;
      }
    );

    this.loadPasswords();
  }

  
  showAlert(message:string){
    this.successMessage = message;
    this.successfulOperation = true;
  }

  resetForm(){
    this.formState = "Add New"; 
    this.enteredEmail = '';
    this.enteredUsername = '';
    this.enteredPassword = '';
    this.currentPasswordId = '';
  }

  onSubmit(values : any){
    console.log(values);
    const encryptedPassword = this.encryptPassword(values.password);
    values.password = encryptedPassword;
    console.log(values);
    
    if (this.formState === 'Add New'){
      this.passwordService.addPassword(values, this.siteId)
      .then(
        ()=>{
          this.showAlert("Password Added Successfully");
          console.log('Password Added Successfully');
        }
      ).catch(
        err=> {
          console.log(err);
        }
      );
    }
    else if (this.formState === 'Edit'){
      this.passwordService.updatePassword(this.siteId, this.currentPasswordId, values)
      .then(
        () =>{
          this.showAlert("Password Updated Successfully");
          console.log("Password Updated Successfully");
        }
      )
      .catch(
        err=>{
          console.log(err);
        }
      );
    }

    this.resetForm();
  }

          

  loadPasswords(){
    this.passwordList$ = this.passwordService.loadPasswords(this.siteId);  
  }


  editPassword(email: string, username:string, password:string, passwordId:string){
    this.formState = "Edit"; 
    this.enteredEmail = email;
    this.enteredUsername = username;
    this.enteredPassword = password;
    this.currentPasswordId = passwordId;
  }

  deletePassword(passwordId:string){
    this.passwordService.deletePassword(this.siteId, passwordId)
    .then(
      ()=>{
        this.showAlert("Password Deleted Successfully");
        console.log("Data Deleted");
      }
    )
    .catch(
      err=>{
        console.log(err);
      }
    );
  }

  // PASSWORD ENCRYPTION METHODS
  encryptPassword(rawPassword:string){
    const secretKey = 'qvvOGvEjOz1eYvADl5PaPlcjBlDu1zpM';
    const encryptedPassword = AES.encrypt(rawPassword,secretKey).toString();
    return encryptedPassword;
  }

  decryptPassword(encryptedPassword:string){
    const secretKey = 'qvvOGvEjOz1eYvADl5PaPlcjBlDu1zpM';
    const decryptedPassword = AES.decrypt(encryptedPassword, secretKey).toString(enc.Utf8);
    console.log(decryptedPassword);
    return decryptedPassword;
  }

  onDecrypt(encryptedPassword:string){
    const rawPassword =  this.decryptPassword(encryptedPassword);
    console.log(rawPassword);
    alert(`Here is the decrypted password: ${rawPassword}`);
  }
}
  
