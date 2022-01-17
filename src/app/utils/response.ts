export class SignUpResponse {

}

export class SignInResponse {
  constructor(public email: string, public id: number, public roles: string[], public accessToken: string, public tokenType: string) {
  }
}
