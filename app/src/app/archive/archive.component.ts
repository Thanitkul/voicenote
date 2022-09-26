import { Component, OnInit } from '@angular/core';
import { ArchiveService } from './archive.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {
  groupId: any = -1;
  display: any = [];

  constructor(private service: ArchiveService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    let data: any;
    this.groupId = this.route.snapshot.paramMap.get('groupId')
    this.service.getCourseData(this.groupId).subscribe((res: any) => {this.display = res, console.log(this.display)}) 

    console.log(this.display)
  }

}