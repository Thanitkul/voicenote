import { Component, OnInit } from '@angular/core';
import { NoteService } from './note.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  roomSelected: string = 'Room A'
  message: string = ''
  wordList: string[] = []
  constructor(private service: NoteService) { }

  ngOnInit(): void {
    this.service.socketListen('message').subscribe(
      (response) => {
        this.wordList.push(response)
      })
  }
  joinRoom(room: string) {
    this.roomSelected = room
    this.service.socketConnection(room)
    this.service.getChatsByRoom(room).subscribe({
        next: (words: any) => {
            this.wordList = words.map(
                (word: any) => word.message)
        },
        error: (error) => console.log(error)
    })
}

sendMessage() {
    // socket emit event message
    this.service.socketEmit('message', {
        room: this.roomSelected, 
        messageText: this.message
    })
    this.message = ''
}

disconnect() {
    console.log('Disconnect')
}

}
