import { Component, OnInit } from '@angular/core'; 
import { speakService } from './speak.service';

declare var stt: any;
declare var startButton: any;
declare var transcript: string;
declare var recognizing: false;


@Component({
  selector: 'app-speak',
  templateUrl: './speak.component.html',
  styleUrls: ['./speak.component.scss']
})

export class SpeakComponent implements OnInit {
  roomSelected: string = 'Room A'
  message: string = transcript;

  constructor(private service: speakService) { }

  ngOnInit(): void {
    stt();
    // while (!recognizing) {
    //   console.log(transcript);
    // }
  } 

  start() {
    startButton();
  }

  // sendMessage() {
  //   // socket emit event message
  //   this.service.socketEmit('message', {
  //   // room: this.roomSelected, 
  //     messageText: this.message
  //   })
  //   this.message = ''
  // }
  
}