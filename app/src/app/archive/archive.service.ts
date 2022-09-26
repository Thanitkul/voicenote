import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArchiveService {

  constructor(private http: HttpClient) { }

  getCourseData(groupId: string) {
    return this.http.get(`${environment.apiHost}/student/get-recording-data/${groupId}`)
  }
}
