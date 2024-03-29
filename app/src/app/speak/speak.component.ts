import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { speakService } from './speak.service';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart} from '@angular/router';
import { not } from '@angular/compiler/src/output/output_ast';
declare var bootstrap: any;

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
    room : any;
    groupId: any = -1;
    stopModal: any;
    stopModalEx: any;
    isSpeak: boolean = false;
    head_speak: string[] = [];
    courseName: string | null = '';
    inPage: boolean = true;
    fromModal: boolean = false;

    constructor(private service: speakService, private route: ActivatedRoute, private router: Router) {
        router.events.subscribe((val) => {
            // see also 
            if (val instanceof NavigationStart) {
                if (!this.inPage && !this.fromModal){
                    alert('out')
                    
                    this.stopEx()
                    this.inPage = true
                    this.fromModal = false
                }
            }
        });
        
    }

    ngOnInit(): void {
        this.stopModal = new bootstrap.Modal(document.getElementById('stop_modal'));
        this.stopModalEx = new bootstrap.Modal(document.getElementById('stop_modal_exception'));
        this.room = this.route.snapshot.paramMap.get('id')
        this.courseName = this.route.snapshot.queryParamMap.get('courseName')
        this.service.socketConnection(this.room);
        this.stt();
        this.service.socketListen('message').subscribe({
            next: (response) => {
                this.displayList.push(response)
            }
        })
        console.log(this.room)
        this.service.speakHeading(this.room).subscribe((res: any) => {this.head_speak = res[0].courseName, console.log(this.head_speak)})
        this.groupId = this.service.startLive(this.room).subscribe(res => { this.groupId = res.groupId, console.log(this.groupId) })
        this.inPage = false
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
                if (this.isSpeak){
                    this.recognition.lang = 'th-TH';
                    this.recognition.start();
                    this.ignore_onend = false;
                    this.isSpeak = true;
                    return;
                }
                else{
                    
                }
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
        this.isSpeak = true;
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

        for (var i = event.resultIndex; i < event.results.length; ++i) {
            let _transcript = event.results[i][0].transcript;
            let confidence = event.results[i][0].confidence;

            if (event.results[i].isFinal && Math.round(confidence) > 0) {
                this.service.socketEmit('message', {
                    room: this.room,
                    messageText: _transcript,
                    groupId: this.groupId
                })
            }

        }
    
    }

    openStopModal(): void {
        this.stopModal.show();
    }
    openStopModalEx(): void {
        this.stopModalEx.show();
    }

    stop() {
        this.speak_stop()
        this.stopModal.hide();
        this.service.endLive(this.room).subscribe(res => this.router.navigate(['/courses/teacher']))
        
    }   
    stopEx() {
        this.speak_stop()
        this.stopModal.hide();
        this.service.endLive(this.room).subscribe(res => {})
        
    }   

    redirectCourse() {
        this.fromModal = true
        this.router.navigate(['/courses/teacher'])
    }

    speak_stop() {
        this.isSpeak = false;
        this.recognition.stop()
    }
    noBack() {
        window.history.forward()
    }
}