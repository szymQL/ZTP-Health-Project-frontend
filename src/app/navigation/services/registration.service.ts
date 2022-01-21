import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
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
    let result = this.httpClient.post(url, body, {observe: 'body', headers: this.headers, responseType: 'json'})
    result.subscribe(
      _ => {
        alert('Rejestracja powiodła się')
        this.router.navigate(['/login'])
      },
      _ => alert('Rejestracja nie powiodła się')
    )
  }
}
