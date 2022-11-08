import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class noteService {
    private socket!: Socket;

    constructor(private http: HttpClient) {
        this.socket = io(`${environment.apiHost}`, {
            transports: ['websocket', 'polling']
        })
    }

    socketConnection(room: number | string) {
        try {
            this.socket.emit('join_room', room);
        } catch (error) {
            console.log(error)
        }
    }

    socketEmit(event: string, data: any) {
        this.socket.emit(event, data)
    }

    // socketDisconnect() {
    //     this.socket.disconnect();
    // }

    socketListen(eventName: string) {
        let observable = new Observable<any>(observer => {
            this.socket.on(eventName, (data) => {
                observer.next(data);
            });
            return () => {
                this.socket.disconnect();
            }
        });

        return observable;
    }

    getCourseData(groupId: string) {
        return this.http.get(`${environment.apiHost}/student/get-recording-data/${groupId}`)
      }

    // getChatsByRoom(room: string) {
    //     return this.http.get(`${environment.apiHost}/chats/${room}`)
    // }
}