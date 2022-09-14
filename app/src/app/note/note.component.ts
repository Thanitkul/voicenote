import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  roomSelected: string = 'Room A'
//   message: string = transcript
  noteList: string[] = []

  constructor() { }

  ngOnInit(): void {
  }

}
