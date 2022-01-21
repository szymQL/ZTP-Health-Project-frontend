export class SignUpRequest {

  constructor(public firstName: string, public email: string, public password: string) {
  }

}

export class SignInRequest {

  constructor(public email: string, public password: string) {
  }
}
