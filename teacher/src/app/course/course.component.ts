import { Component, OnInit } from '@angular/core';
declare var window: any;
import axios from 'axios';

@Component({
    selector: 'app-course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
    formModal: any;
    searchText: any;

    
    constructor() {}

    ngOnInit(): void {
        this.formModal = new window.bootstrap.Modal(
            document.getElementById('myModal')
        );
        this.get_course()
        
    }

    async get_course(){
        try {
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTY2MDIwODExNH0.iQgb38ECM8sc6wBXVdlNpZhAf5BqRnnnLKhzzWV0CXQ'
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
        
            const {data} = await axios.get(
                'http://localhost:3000/teacher/courses',
                config
            )
            localStorage.setItem('courses', JSON.stringify(data));
            return data
        } catch (error) {
            return console.error();
            
        }
    }  
    openFormModal() {
        this.formModal.show();
    }
    create() {
        var name = (<HTMLInputElement>document.getElementById("name")).value;
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTY2MDIwODExNH0.iQgb38ECM8sc6wBXVdlNpZhAf5BqRnnnLKhzzWV0CXQ'
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        const bodyParameters = {
            courseName: name
        };

        axios.post(
            'http://localhost:3000/teacher/create-course',
            bodyParameters,
            config
        ).then(console.log).catch(console.log);

        window.location.reload();
    }
    

    public user_data = {
        "id": 1,
        "first_name": "Jack",
        "last_name": "Wang"
    }

    loadTasks(): Task[] {
    const course_data = localStorage.getItem('courses')
    if (course_data == null) return []
    return JSON.parse(course_data)
}
    public courses_data = this.get_course()



    
}