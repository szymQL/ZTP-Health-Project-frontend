import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {SignInRequest} from "../../commons/utils/requests";
import {SignInResponse} from "../../commons/utils/response";
import {LocalStorageService} from "./local-storage.service";

@Injectable()
export class LoginService {

  private headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
  private readonly serverUrl;

  constructor(private httpClient: HttpClient, private router: Router, private lservice: LocalStorageService) {
    this.serverUrl = `http://${environment.serverHost}:${environment.serverPort}`;
  }

  public loginUser(signInRequest: SignInRequest) {
    let url = `${this.serverUrl}/auth/signin`;
    let body = JSON.stringify(signInRequest);
    let result = this.httpClient.post<SignInResponse>(url, body, {observe: 'body', headers: this.headers, responseType: 'json'});
    result.subscribe(
      response => {
        this.lservice.set('token', (response.accessToken));
        this.lservice.set('id', (response.id).toString());
        this.lservice.set('role', (response.roles[0]));
        if(response.roles[0] == 'ADMIN') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      },
      err => alert(err.message)
    )
  }

  public logoutUser() {
    this.lservice.remove('token')
    this.lservice.remove('id')
    this.lservice.remove('role')
    this.router.navigate(['/login'])
  }
}
