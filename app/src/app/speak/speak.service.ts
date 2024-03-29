import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class speakService {
    private socket!: Socket;

    constructor(private http: HttpClient) {
        this.socket = io(environment.apiHost.replace("/api", ""), {
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
    startLive(id: number) {
        const body = {
            courseId: id
        };
        return this.http.patch<any>(`${environment.apiHost}/teacher/start-live`, body)
    }

    endLive(id: number) {
        const body = {
            courseId: id
        };
        return this.http.patch<any>(`${environment.apiHost}/teacher/end-live`, body)
    }

    speakHeading(id: number) {
        return this.http.get(`${environment.apiHost}/teacher/courses/${id}`)
    }

    // getChatsByRoom(room: string) {
    //     return this.http.get(`${environment.apiHost}/chats/${room}`)
    // }
}