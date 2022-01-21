import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LocalStorageService} from "../../navigation/services/local-storage.service";
import {environment} from "../../../environments/environment";
import {Notification} from "../utils/notification";
import {map} from "rxjs/operators";

@Injectable()
export class NotificationService {
  private readonly headers;
  private readonly postHeaders;
  private readonly serverUrl;

  constructor(private httpClient: HttpClient, lservice: LocalStorageService) {
    this.serverUrl = `http://${environment.serverHost}:${environment.serverPort}`
    this.headers = new HttpHeaders({Authorization: `Bearer ${lservice.get('token')}`});
    this.postHeaders = new HttpHeaders()
      .set('Authorization', `Bearer ${lservice.get('token')}`)
      .set('Content-Type', 'application/json');
  }

  public findAllNotifications() {
    let path = `${this.serverUrl}/dashboard/notifications`
    return this.httpClient.get<Notification[]>(path, {observe: 'body', headers: this.headers, responseType: 'json'}).pipe(
      map(notifications => {
        return notifications.map(n => {
          let temp: Notification = {
            id: n.id,
            createDate: this.userFriendlyDate(n.createDate),
            message: n.message,
            sender: n.sender
          }
          return temp
        })
      })
    )
  }

  public getNotificationsCount() {
    return this.findAllNotifications().pipe(
      map(notifications => notifications.length)
    )
  }

  public deleteRecipe(id: number) {
    let path = `${this.serverUrl}/dashboard/notifications/${id}`;
    return this.httpClient.delete(path, {observe: 'body', headers: this.headers, responseType: 'text'});
  }

  public addNotification(notification: Notification) {
    let recipeAsJSON = JSON.stringify(notification);
    let path = `${this.serverUrl}/dashboard/notifications`;
    return this.httpClient.post(path, recipeAsJSON, {observe: 'body', headers: this.postHeaders, responseType: 'text'});
  }

  private userFriendlyDate(date: string) {
    return new Date(date).toDateString()
  }
}
