import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {environment} from "../../../environments/environment";
import {SignUpRequest} from "../../commons/utils/requests";
import {Router} from "@angular/router";

@Injectable()
export class RegistrationService {

  private headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
  private readonly serverUrl;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.serverUrl = `http://${environment.serverHost}:${environment.serverPort}`
  }

  public registerUser(signUpRequest: SignUpRequest) {
    let url = `${this.serverUrl}/auth/signup`
    let body = JSON.stringify(signUpRequest)
    let result = this.httpClient.post(url, body, {observe: 'response', headers: this.headers, responseType: 'json'})
    result.subscribe(
      response => {
        console.log(JSON.stringify(response.body))
        this.router.navigate(['/login'])
      },
      err => alert(err.message)
    )
  }
}
