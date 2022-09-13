import { Component, OnInit } from '@angular/core';
import { noteService } from './note.service';

declare var transcript: string;

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})

export class NoteComponent implements OnInit {
  roomSelected: string = 'Room A'
  message: string = transcript
  wordList: string[] = []

  constructor(private service: noteService) { }

  ngOnInit(): void {
    this.service.socketListen('message').subscribe(
      (response) => {
          this.wordList.push(response)
      })
}
}

  // joinRoom(room: string) {
  //   this.roomSelected = room
  //   this.service.socketConnection(room)
  //   // this.service.getChatsByRoom(room).subscribe({
  //   //     next: (chats: any) => {
  //   //         this.wordList = chats.map(
  //   //             (chat: any) => chat.message)
  //   //     },
  //   //     error: (error) => console.log(error)
  //   // })
  // }

// sendMessage() {
//     // socket emit event message
//     if (!transcript) {
      
//       this.service.socketEmit('message', {
//         room: this.roomSelected, 
//         messageText: this.message
//     })
//     }
//     this.service.socketEmit('message', {
//         room: this.roomSelected, 
//         messageText: this.message
//     })
//     this.message = ''
// }

// disconnect() {
//     console.log('Disconnect')
// }

// }
