import { Component, OnInit } from '@angular/core';
import { SocketService } from './socket.service';



@Component({
  selector: 'app-socket',
  templateUrl: './socket.component.html',
  styleUrls: ['./socket.component.scss']
})
export class SocketComponent implements OnInit {
  roomSelected: string = 'Room A'
  message: string = ''
  noteList: string[] = []

  constructor(private service: SocketService) { }
 
  ngOnInit(): void {
    this.service.socketListen('message').subscribe(
      (response) => {
          this.noteList.push(response)
      })
}

joinRoom(room: string) {
  this.roomSelected = room
  this.service.socketConnection(room)
  // this.service.getChatsByRoom(room).subscribe({
  //     next: (chats: any) => {
  //         this.noteList = chats.map(
  //             (chat: any) => chat.message)
  //     },
  //     error: (error) => console.log(error)
  // })
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
