import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
@Component({
  selector: 'app-site-list',
  imports: [FormsModule],
  templateUrl: './site-list.component.html',
  styleUrl: './site-list.component.css'
})
export class SiteListComponent {
  onSubmit(formValues : object){
    console.log("Submitted");
    console.log(formValues);
    
  }
}
