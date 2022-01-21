import {Injectable} from "@angular/core";
import {LocalStorageService} from "../../navigation/services/local-storage.service";

@Injectable()
export class AuthService {

  constructor(private lservice: LocalStorageService) {
  }

  public hasToken() {
    return this.lservice.get('token') != null
  }

  public role() {
    return this.lservice.get('role')
  }
}
