import {Component, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {LoginService} from "../navigation/services/login.service";
import {LocalStorageService} from "../navigation/services/local-storage.service";
import {NotificationService} from "../commons/services/notification.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  notificationsCount: number;

  constructor(private breakpointObserver: BreakpointObserver, public service: LoginService, public lservice: LocalStorageService, private nservice: NotificationService) {}

  ngOnInit() {
    this.nservice.getNotificationsCount().subscribe(
      success => this.notificationsCount = success,
      err => {
        this.notificationsCount = 0;
        alert('Nie udało się pobrać wiadomości z serwera');
      }
    )
  }
}
