import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { speakService } from './speak.service';

// declare var stt: any;
// declare var startButton: any;
// declare var transcript: string;
// declare var recognizing: false;
declare var webkitSpeechRecognition: any;

@Component({
    selector: 'app-speak',
    templateUrl: './speak.component.html',
    styleUrls: ['./speak.component.scss']
})

export class SpeakComponent implements OnInit {
    roomSelected: string = 'Room A'
    // message: string = transcript;

    recognition: any;
    recognizing: boolean = false;
    final_transcript: string = '';
    transcript: string = '';
    ignore_onend: any;
    start_timestamp: number | any = 0;
    lastDebounceTranscript: any;
    two_line: string | any = /\n\n/g;
    one_line: string | any = /\n/g;
    first_char: string | any = /\S/;
    finalSpan: string = '';
    displayList: string[] = [];

    constructor(private service: speakService) {
        
    }

    ngOnInit(): void {
        this.service.socketConnection(1);
        this.stt();
        this.service.socketListen('message').subscribe({
            next: (response) => {
                this.displayList.push(response)
            }
        })
    }

    stt() {
        // const SpeechRecognition: any = new webkitSpeechRecognition();
        this.recognition = new webkitSpeechRecognition();
        this.recognition.continuous = true;
        this.recognition.interimResults = true;

        this.recognition.onerror = (event: any) => {
            if (event.error == 'no-speech') {
                alert('info_no_speech');
                this.ignore_onend = true;
            }
            if (event.error == 'audio-capture') {
                alert('info_no_microphone');
                this.ignore_onend = true;
            }
            if (event.error == 'not-allowed') {
                if (event.timeStamp - this.start_timestamp < 100) {
                    alert('info_blocked');
                } else {
                    alert('info_denied');
                }
                this.ignore_onend = true;
            }
        };

        this.recognition.onend = () => {
            this.recognizing = false;
            //currently false
            if (this.ignore_onend) {
                return;
            }
            if (!this.final_transcript) {
                alert('info_start');
                return;
            }
        };

        this.recognition.onresult = this.sttWatch.bind(this);
    }

    start() {
        console.log('======start======');
        // this.recognition.lang = 'th-TH';
        // this.recognizing = true;

        // console.log(this.recognizing);

        // if (this.recognizing) {
        //     this.recognition.stop();
        //     return;
        // }
        
        this.recognition.lang = 'th-TH';
        this.recognition.start();
        this.ignore_onend = false;
        alert('info_allow');
        // start_timestamp = event.timeStamp;
    }

    sttWatch(event: any): any {
        console.log(event.results);
        let interim_transcript = '';
        if (typeof (event.results) == 'undefined') {
            this.recognition.onend = null;
            this.recognition.stop();
            alert('Browser is not support');
            return '';
        }

        // console.log(event.resultIndex);
        // console.log(event.results[0]);
        for (var i = event.resultIndex; i < event.results.length; ++i) {
            let _transcript = event.results[i][0].transcript;
            let confidence = event.results[i][0].confidence;
            
            console.log('i = ', i);
            console.log('event.results[i]: ', event.results[i].isFinal);
            console.log(Math.round(confidence));

            if (event.results[i].isFinal && Math.round(confidence) > 0) {
                console.log('===============');

                console.log('this.transcript: ', this.transcript);
                this.service.socketEmit('message', {
                    room: 1,
                    messageText: _transcript
                })
                // if (this.final_transcript == '') {
                //     this.final_transcript += this.transcript;
                // }
                // else {
                //     this.final_transcript += ' ' + this.transcript;
                // }

            } 
            // else {
            //     interim_transcript += '' + this.transcript;
            // }
        }

        // this.displayText = interim_transcript;
        // console.log('this.final_transcript: ', interim_transcript)
        // console.log('this.final_transcript: ', this.final_transcript);
        // console.log('this.final_transcript: ', this.transcript);

        // return this.transcript;
    }

    stop() {
        this.recognition.stop();
    }
}