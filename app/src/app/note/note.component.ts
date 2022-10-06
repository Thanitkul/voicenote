import { Component, OnInit } from '@angular/core';
import { noteService } from './note.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  groupId: any = -1;
  displayList: string[] = [];
  room: any = "";
  courseName: any = {};
    
    constructor(private service: noteService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.room = this.route.snapshot.paramMap.get('courseId')
        this.groupId = this.route.snapshot.paramMap.get('groupId')
        this.courseName = this.route.snapshot.queryParamMap.get('courseName')
        this.service.getCourseData(this.groupId).subscribe((res: any) => {this.displayList = res, console.log(this.displayList)})
        this.service.socketConnection(this.room);
        this.service.socketListen('message').subscribe({
            next: (response) => {
                this.displayList.push(response)
            }
        })
        console.log(this.courseName)
    }

    redirectCourse() {
      this.router.navigate(['/courses/student'])
    }
}
