import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';
@Injectable({
  providedIn: 'root'
})

export class NotificationsService {
  private notifier: NotifierService;
  constructor(
    notifier: NotifierService
  ) {
    this.notifier = notifier;
  }
  showNotification( type: string, message: string ): void {
    this.notifier.notify( type, message );
  }
}
