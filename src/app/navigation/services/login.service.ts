import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {SignInRequest} from "../../utils/requests";
import {GlobalConst} from "../../utils/global-const";
import {SignInResponse} from "../../utils/response";
import {LocalStorageService} from "./local-storage.service";

@Injectable()
export class LoginService {

  private headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
  private readonly serverUrl;

  constructor(private httpClient: HttpClient, private router: Router, private lservice: LocalStorageService) {
    this.serverUrl = `http://${environment.serverHost}:${environment.serverPort}`
  }

  public loginUser(signInRequest: SignInRequest) {
    let url = `${this.serverUrl}/api/auth/signin`
    let body = JSON.stringify(signInRequest)
    let result = this.httpClient.post<SignInResponse>(url, body, {observe: 'response', headers: this.headers, responseType: 'json'})
    result.subscribe(
      response => {
        console.log(response.body)
        GlobalConst.isLoggedIn = true;
        console.log(response.body?.accessToken)
        this.lservice.set('token', (response.body?.accessToken as string))
        this.lservice.set('firstName', (response.body?.email as string))
        console.log(this.lservice.get('token'))
        this.router.navigate(['/dashboard'])
      },
      err => alert(err.message)
    )
  }

  public logoutUser() {
    let url = `${this.serverUrl}/api/auth/log-out`
    let result = this.httpClient.post(url, null, {observe: 'response', headers: this.headers, responseType: 'text'})
    result.subscribe(
      response => {
        alert(response.body)
        GlobalConst.isLoggedIn = false;
        this.router.navigate(['/login'])
      },
      err => alert(err.message)
    )
  }
}
