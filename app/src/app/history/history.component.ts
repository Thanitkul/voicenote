import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { Router } from '@angular/router'
import { HttpClientModule } from '@angular/common/http';
=======
import { ActivatedRoute, Router } from '@angular/router'
>>>>>>> origin/main
import { HistoryService } from './history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})

<<<<<<< HEAD
  recordings: any;

  course_id:any = 22;


  constructor(private router: Router, private http: HttpClientModule, private service: HistoryService) { }

  

  ngOnInit(): void {
    this.service.getrecordings(this.course_id).subscribe((Response:any) => {this.recordings = Response, console.log(Response)});
=======
export class HistoryComponent implements OnInit {
  history: any[] = [];
  courseId: string | null = '';
  courseName: string | null = '';

  constructor(private router: Router, private service: HistoryService, private route: ActivatedRoute) { }

  ngOnInit(): void {
      this.courseId = this.route.snapshot.paramMap.get('id')
      this.courseName = this.route.snapshot.queryParamMap.get('courseName');
      this.service.getHistory(this.courseId).subscribe((res: any) => { this.history = this.convertToDisplay(res)})
>>>>>>> origin/main
  }

  convertToDisplay(response: any[]): any {

      //  [{"date":"2022-09-23","times": [{"time":"04:34:07", "groupId": "12341234"}]}]
      const display: any[] = [];
      for (const row of response) {
          const foundDisplay = display.find((dp: any) => dp.date === row.recordedAtDate);

          if (foundDisplay) {
              foundDisplay.times.push({
                  time: row.recordedAtTime,
                  groupId: row.groupId,
              });
          } else {
              display.push({
                  date: row.recordedAtDate,
                  times: [
                      {
                          time: row.recordedAtTime,
                          groupId: row.groupId,
                      },
                  ],
              });
          }
      }
      return display
  }
  redirect(){
    this.router.navigate(['/student']);
  }

}


