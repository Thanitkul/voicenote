import { Component, OnInit } from '@angular/core';
import { noteService } from './note.service';
import { ActivatedRoute, Router } from '@angular/router';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas'

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  groupId: any = -1;
  displayList: string[] = [];
  room: any = "";
  courseId: string | null = '';
    
    constructor(private service: noteService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.room = this.route.snapshot.paramMap.get('courseId')
        this.groupId = this.route.snapshot.paramMap.get('groupId')
        this.service.getCourseData(this.groupId).subscribe((res: any) => {
            console.log(res)
            for (let i = 0; i < res.length; i++) {
                console.log(res[i].data)
                this.displayList.push(res[i].data)
            }
            console.log(this.displayList)
        })
        this.service.socketConnection(this.room);
        this.service.socketListen('message').subscribe({
            next: (response) => {
                this.displayList.push(response)
            }
        })
    }

    redirectCourse() {
      this.router.navigate(['/courses/student'])
    }
    htmlToPdf() {
        var data = document.getElementById('contentToConvert');  //Id of the table
        if (data) {
            html2canvas(data, { scale: 4 }).then(canvas => {
                // Few necessary setting options  
                let imgWidth = 300;
                let pageHeight = 400;
                let imgHeight = canvas.height * imgWidth / canvas.width;
                let heightLeft = imgHeight;

                const contentDataURL = canvas.toDataURL('image/png')
                let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
                let position = 0;
                pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
                pdf.save('MYPdf.pdf'); // Generated PDF   
            });
        }
    }
}
