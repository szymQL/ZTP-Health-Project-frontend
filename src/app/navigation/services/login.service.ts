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
    return this.httpClient.post<SignInResponse>(url, body, {observe: 'body', headers: this.headers, responseType: 'json'});
  }

  public logoutUser() {
    this.lservice.remove('token')
    this.lservice.remove('id')
    this.lservice.remove('role')
    this.router.navigate(['/login'])
  }
}
