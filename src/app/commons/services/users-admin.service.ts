import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {LocalStorageService} from "../../navigation/services/local-storage.service";
import {User} from "../utils/response";
import {map} from "rxjs/operators";

@Injectable()
export class UsersAdminService {

  private readonly headers;
  private readonly serverUrl;

  constructor(private httpClient: HttpClient, private lservice: LocalStorageService) {
    this.serverUrl = `http://${environment.serverHost}:${environment.serverPort}`
    this.headers = new HttpHeaders({Authorization: `Bearer ${lservice.get('token')}`});
  }

  public getAllUsers() {
    let path = `${this.serverUrl}/manage/users`
    return this.httpClient.get<User[]>(path, {observe: 'body', headers: this.headers}).pipe(
      map(users => users.filter(user => user.role != 'ADMIN'))
    );
  }

  public deleteUser(id: number) {
    let path = `${this.serverUrl}/manage/users/${id}`
    return this.httpClient.delete(path, {observe: 'body', headers: this.headers, responseType: 'text'})
  }

}
