import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PasswordManagerService } from '../password-manager.service';

@Component({
  selector: 'app-password-list',
  imports: [FormsModule],
  templateUrl: './password-list.component.html',
  styleUrl: './password-list.component.css'
})
export class PasswordListComponent {
  siteId!:string;
  siteURL!:string;
  siteImageURL!:string;
  siteName!:string;

  constructor(private route: ActivatedRoute, private passwordService : PasswordManagerService){
    this.route.queryParams.subscribe(
      (val:any)=>{
        this.siteId = val.id;
        this.siteImageURL = val.siteImageURL;
        this.siteURL = val.siteURL;
        this.siteName = val.siteName;
      }
    )
  }

  onSubmit(values : object){
    console.log(values);
    this.passwordService.addPassword(values, this.siteId)
    .then(
      ()=>{
        console.log('Password Added Successfully');
      }
    ).catch(
      err=> {
        console.log(err);
      }
    );
    console.log(this.siteId);
    console.log(this.siteImageURL);
    console.log(this.siteName);
    console.log(this.siteURL);
    
  }
}
        
        
