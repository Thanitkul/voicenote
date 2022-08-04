import { Component, OnInit } from '@angular/core';
declare var window: any;

@Component({
    selector: 'app-course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
    formModal: any;
    searchText: any;

    constructor() { }

    ngOnInit(): void {
        this.formModal = new window.bootstrap.Modal(
            document.getElementById('myModal')
        );
    }

    openFormModal() {
        this.formModal.show();
    }
    makecode() {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < 6; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }
    create() {
        var name = (<HTMLInputElement>document.getElementById("name")).value;
        var code = this.makecode()
        
        this.course_data.push(
            {
                "id": 11,
                "course_name": name,
                "code": code
            }
        )
        this.formModal.hide();
    }

    public user_data = {
        "id": 1,
        "first_name": "Jack",
        "last_name": "Wang"
    }
    public course_data =
        [
            {
                "id": 11,
                "course_name": "Mathematics",
                "code": "math20"
            },
            {
                "id": 12,
                "course_name": "Science",
                "code": "sci34"
            }, {
                "id": 13,
                "course_name": "English",
                "code": "eng89"
            },
        ]



}