import { Component, OnInit } from '@angular/core';


declare var stt: any;
declare var startButton: any;
declare var transcript: string;


@Component({
  selector: 'app-speak',
  templateUrl: './speak.component.html',
  styleUrls: ['./speak.component.scss']
})

export class SpeakComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    stt();
    console.log(transcript);

  } 

  start() {
    startButton();
  }

  
}