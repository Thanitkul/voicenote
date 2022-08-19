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
    logout(): void {
        sessionStorage.clear()
    }
    async get_course(){
        try {
            const token = sessionStorage.getItem('token')
            console.log('token',token)
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
        
            const {data} = await axios.get(
                'http://localhost:3000/teacher/courses',
                config
            )
            localStorage.setItem('courses', JSON.stringify(data));
            console.log(data)
            return data
        } catch (error) {
            return console.error();
            
        }
    }  
    async get_username() {
        try {
            const token = sessionStorage.getItem('token')
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            const { data } = await axios.get(
                'http://localhost:3000/auth/get-username',
                config
            )
            console.log('data',data)
            return data.username
        } catch (error) {
            return console.error();

        }
    }
    openFormModal() {
        this.formModal.show();
    }
    create() {
        var name = (<HTMLInputElement>document.getElementById("name")).value;
        const token = sessionStorage.getItem('token')
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
    

    public user_data = (async () => {
        const users = await this.get_username()
        return users
    })()

    loadTasks(): Task[] {
    const course_data = localStorage.getItem('courses')
    if (course_data == null) return []
    return JSON.parse(course_data)
}
    public courses_data = this.get_course()



    
}