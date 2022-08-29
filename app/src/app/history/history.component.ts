import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  samples: any = [{"id": 1, "course_name": "Mathematics", "time": "08:00", "date": "01/01/2022"}, {"id": 2, "course_name": "Mathematics", "time": "09:00", "date": "02/01/2022"}, {"id": 3, "course_name": "Mathematics", "time": "10:00", "date": "03/01/2022"}, {"id": 4, "course_name": "Mathematics", "time": "08:00", "date": "04/01/2022"}]

  constructor() { }

  ngOnInit(): void {
  }

}
