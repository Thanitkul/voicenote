import { Component, OnInit } from '@angular/core'; 
declare var startButton: any;


@Component({
  selector: 'app-speak',
  templateUrl: './speak.component.html',
  styleUrls: ['./speak.component.scss']
})
export class SpeakComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    
  } 

  start() {
    startButton();
  }

}
