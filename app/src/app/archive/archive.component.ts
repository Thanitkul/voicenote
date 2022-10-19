import { Component, OnInit } from '@angular/core';
import { ArchiveService } from './archive.service';
import { ActivatedRoute, Router } from '@angular/router';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas'
import { Location } from '@angular/common'

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {
  groupId: any = -1;
  display: any = [];
  courseName: string | null = '';
  fontSize: number = 24;

  constructor(private service: ArchiveService, private route: ActivatedRoute, private router: Router, private location: Location) { }

  ngOnInit(): void {
    let data: any;
    this.groupId = this.route.snapshot.paramMap.get('groupId')
    this.service.getCourseData(this.groupId).subscribe((res: any) => { this.display = res, console.log(this.display) })
    this.courseName = this.route.snapshot.queryParamMap.get('courseName');

    console.log(this.display)
  }
  htmlToPdf() {
    var data = document.getElementById('contentToConvert');  //Id of the table

    if (data) {

      html2canvas(data, { scale: 4 }).then(canvas => {
        // Few necessary setting options  
        let imgWidth = 210;
        let pageHeight = 297;
        let imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;

        const contentDataURL = canvas.toDataURL('image/png')
        let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
        let position = 0;
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, heightLeft)
        pdf.save('MYPdf.pdf'); // Generated PDF   
      });
    }
  }

  redirect() {
    this.location.back()
  }
  
  IncrFontSize() {
    this.fontSize++;
  }
  DecreFontSize() {
    this.fontSize--;
  }

}