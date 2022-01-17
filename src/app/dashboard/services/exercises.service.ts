import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {environment} from "../../../environments/environment";
import {Exercise} from "../../utils/exercise";
import {GlobalConst} from "../../utils/global-const";
import {LocalStorageService} from "../../navigation/services/local-storage.service";

@Injectable()
export class ExercisesService {

  private headers;
  private readonly serverUrl;

  constructor(private httpClient: HttpClient, private lservice: LocalStorageService) {
    this.serverUrl = `http://${environment.serverHost}:${environment.serverPort}`
    this.headers = new HttpHeaders({Authorization: `Bearer ${lservice.get('token')}`});
  }

  public findAllExercises() {
    let path = `${this.serverUrl}/api/test/user`
    this.httpClient.get<Exercise[]>(path, {observe: 'response', headers: this.headers, responseType: 'json'}).subscribe(
      response => {
        console.log(JSON.stringify(response.body))
        console.log(JSON.stringify(response))
        console.log(response)
        return response.body
      },
      err => alert(err.message)
    )
  }

}
