import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import { PasswordManagerService } from '../password-manager.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-site-list',
  imports: [FormsModule, CommonModule],
  templateUrl: './site-list.component.html',
  styleUrl: './site-list.component.css'
})
export class SiteListComponent {

  allSites! : Observable <Array<any>>
  
  constructor(private passwordManagerService : PasswordManagerService) {
    this.loadSites();
  }


  onSubmit(formValues : object){
    console.log("Submitted");
    console.log(formValues);
    this.passwordManagerService.addSite(formValues)
    .then(
      ()=>{
        console.log('Data saved');
      }
    )
    .catch(
      (err)=>{
        console.log(err);
      }
    )
  }


  loadSites(){
    this.allSites = this.passwordManagerService.loadSites();
  }
}

        
       
        
