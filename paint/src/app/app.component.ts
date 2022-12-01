import { Component } from '@angular/core';
import { UntypedFormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  
})
export class AppComponent {
  title = 'paint';
  redo(){console.log("redo")}
  undo(){console.log("undo")}
  
}
