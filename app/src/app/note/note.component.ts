import { Component, OnInit } from '@angular/core';
import { noteService } from './note.service';
@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  displayList: string[] = [];
    
    constructor(private service: noteService) { }

    ngOnInit(): void {
        this.service.socketConnection(1);
        this.service.socketListen('message').subscribe({
            next: (response) => {
                this.displayList.push(response)
            }
        })
    }


}
