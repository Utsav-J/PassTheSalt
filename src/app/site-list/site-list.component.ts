import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import { PasswordManagerService } from '../password-manager.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
@Component({
  selector: 'app-site-list',
  imports: [FormsModule, CommonModule, RouterLink, NavbarComponent],
  templateUrl: './site-list.component.html',
  styleUrl: './site-list.component.css'
})
export class SiteListComponent {

  allSites! : Observable <Array<any>>
  siteName!: string;
  siteURL!: string;
  siteImageURL!: string;
  siteId!: string;
  formState:string = "Add New";
  successfulOperation:boolean = false;
  successMessage!:string;

  constructor(private passwordManagerService : PasswordManagerService) {
    this.loadSites();
  }

  showAlert(message:string){
    this.successMessage = message;
    this.successfulOperation = true;
  }

  onSubmit(formValues : object){
    console.log(formValues);
    if(this.formState === 'Add New'){
      this.passwordManagerService.addSite(formValues)
      .then(
        ()=>{
          console.log('Data saved');
          this.showAlert('New Site Saved')
        }
      )
      .catch(
        (err)=>{
          console.log(err);
        }
      )
    }
    else if(this.formState === 'Edit'){
      this.passwordManagerService.updateSite(this.siteId, formValues)
      .then(
        ()=>{
          console.log("Site Data Updated");
          this.showAlert('Site Data Updated')
        }
      ).catch(
        err=>{
          console.log(err);
        }
      );
    }
  }
          
  loadSites(){
    this.allSites = this.passwordManagerService.loadSites();
  }

  editSite(siteName: string, siteURL: string, siteImageURL:string, id:string){
    this.siteName = siteName;
    this.siteURL = siteURL;
    this.siteImageURL = siteImageURL;
    this.siteId = id;

    this.formState = 'Edit';
  }

  deleteSite(id:string){
    this.passwordManagerService.deleteSite(id)
    .then(
      ()=>{
        console.log('Deleted');
        this.showAlert('Site Deleted Successfully')
      }
    )
    .catch(
      err=>{
        console.log(err);
      }
    )      
  }
}

// 5:25:26
        

        
       
        
