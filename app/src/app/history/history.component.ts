import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { HttpClientModule } from '@angular/common/http';
import { HistoryService } from './history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  samples: any = [{"id": 1, "course_name": "Mathematics", "time": "08:00", "date": "01/01/2022"}, {"id": 2, "course_name": "Mathematics", "time": "09:00", "date": "02/01/2022"}, {"id": 3, "course_name": "Mathematics", "time": "10:00", "date": "03/01/2022"}, {"id": 4, "course_name": "Mathematics", "time": "08:00", "date": "04/01/2022"}]

  recordings: any;

  course_id:any = 22;


  constructor(private router: Router, private http: HttpClientModule, private service: HistoryService) { }

  

  ngOnInit(): void {
    this.service.getrecordings(this.course_id).subscribe((Response:any) => {this.recordings = Response, console.log(Response)});
  }

  redirect(){
    this.router.navigate(['/student']);
  }

}


