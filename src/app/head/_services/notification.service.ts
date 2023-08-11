import {  Injectable } from '@angular/core';
import { StompService } from '@stomp/ng2-stompjs';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications: string[] = [];
  private lastNotification;
  private unreadNotifications = 0;
  private notificationsSubject: Subject<string[]> = new Subject<string[]>();
  private notificationNumberSubject: Subject<number> = new Subject<number>();

  constructor(private stompService: StompService,  
    ) {
    this.init();
  }

  private init(): void {
    this.stompService.initAndConnect();
    const storedNotifications = localStorage.getItem('notifications');
    if (storedNotifications) {
      this.notifications = JSON.parse(storedNotifications);
    }

    const storedUnreadNotifications = localStorage.getItem('unreadNotifications');
    if (storedUnreadNotifications) {
      this.unreadNotifications = JSON.parse(storedUnreadNotifications);
    }

    this.stompService.subscribe('/topic/progress').subscribe(
      (message) => {
        console.log('Received message:', message);
        const text = new TextDecoder().decode(message.binaryBody);
        if (text !== this.lastNotification) {
          this.notifications.push(text);
          this.unreadNotifications = this.unreadNotifications + 1;
          this.lastNotification = text;
          localStorage.setItem('notifications', JSON.stringify(this.notifications));
          localStorage.setItem('unreadNotifications', JSON.stringify(this.unreadNotifications));
          this.notificationsSubject.next(this.notifications.slice().reverse());
          this.notificationNumberSubject.next(this.unreadNotifications);
        }
      },
      (error) => {
        console.error('WebSocket error:', error);
      }
    );
  }

  getNotifications(): string[] {
    return this.notifications.slice().reverse();
  }

  getNotificationNumber() {
    return this.unreadNotifications;
  }
  getNotificationsObservable(): Observable<string[]> {
    return this.notificationsSubject.asObservable();
  }

  // Exposer l'Observable pour le nombre de notifications non lues
  getNotificationNumberObservable(): Observable<number> {
    return this.notificationNumberSubject.asObservable();
  }

  resetNotificationNumber() {
    this.unreadNotifications = 0;
    localStorage.setItem('unreadNotifications', JSON.stringify(this.unreadNotifications));
    this.notificationNumberSubject.next(this.unreadNotifications);

  }
}