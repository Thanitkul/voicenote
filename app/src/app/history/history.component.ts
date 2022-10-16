import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { HistoryService } from './history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})

export class HistoryComponent implements OnInit {
  history: any[] = [];
  courseId: string | null = '';
  courseName: string | null = '';

  constructor(private router: Router, private service: HistoryService, private route: ActivatedRoute) { }

  ngOnInit(): void {
      this.courseId = this.route.snapshot.paramMap.get('id')
      this.courseName = this.route.snapshot.queryParamMap.get('courseName');
      this.service.getHistory(this.courseId).subscribe((res: any) => { this.history = this.convertToDisplay(res), console.log(this.history)})
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


