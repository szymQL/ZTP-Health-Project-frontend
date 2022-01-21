import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LocalStorageService} from "../../navigation/services/local-storage.service";
import {environment} from "../../../environments/environment";
import {UserWeights} from "../utils/user-weights";
import {Message} from "../utils/response";

@Injectable()
export class UserDetailsService {

  private readonly headers;
  private readonly serverUrl;

  constructor(private httpClient: HttpClient, private lservice: LocalStorageService) {
    this.serverUrl = `http://${environment.serverHost}:${environment.serverPort}`
    this.headers = new HttpHeaders({Authorization: `Bearer ${lservice.get('token')}`});
  }

  public getUserWeights() {
    let path = `${this.serverUrl}/account/weights`
    return this.httpClient.get<UserWeights[]>(path, {observe: 'body', headers: this.headers})
  }

  public updateWeights(weight: number) {
    let path = `${this.serverUrl}/account/task/weight/${weight}`
    return this.httpClient.post(path, null, {headers: this.headers, observe: 'body', responseType: 'text'})
  }

}
