import { Component, OnInit } from '@angular/core';
import { speakService } from '../speak.service';

@Component({
    selector: 'app-listen',
    templateUrl: './listen.component.html',
    styleUrls: ['./listen.component.scss']
})
export class ListenComponent implements OnInit {
    displayList: string[] = [];
    
    constructor(private service: speakService) { }

    ngOnInit(): void {
        this.service.socketConnection(1);
        this.service.socketListen('message').subscribe({
            next: (response) => {
                this.displayList.push(response)
            }
        })
    }

}
