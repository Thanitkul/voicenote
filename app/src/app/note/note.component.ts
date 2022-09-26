import { Component, OnInit } from '@angular/core';
import { noteService } from './note.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  displayList: string[] = [];
    
    constructor(private service: noteService, private router: Router) { }

    ngOnInit(): void {
        this.service.socketConnection(1);
        this.service.socketListen('message').subscribe({
            next: (response) => {
                this.displayList.push(response)
            }
        })
    }

    redirectCourse() {
      this.router.navigate(['/courses/student'])
    }
}
