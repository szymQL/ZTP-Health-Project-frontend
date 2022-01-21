import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Injectable} from "@angular/core";
import {LocalStorageService} from "../../navigation/services/local-storage.service";
import {Supplement} from "../utils/supplement";

@Injectable()
export class SupplementsService {

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

  public findAllSupplements() {
    let path = `${this.serverUrl}/dashboard/supplements`
    return this.httpClient.get<Supplement[]>(path, {observe: 'body', headers: this.headers, responseType: 'json'})
  }

  public deleteSupplement(id: number) {
    let path = `${this.serverUrl}/dashboard/supplements/${id}`;
    return this.httpClient.delete(path, {observe: 'body', headers: this.headers, responseType: 'text'});
  }

  public addSupplement(supplement: Supplement) {
    let recipeAsJSON = JSON.stringify(supplement);
    let path = `${this.serverUrl}/dashboard/supplements`;
    return this.httpClient.post(path, recipeAsJSON, {observe: 'body', headers: this.postHeaders, responseType: 'text'});
  }
}
