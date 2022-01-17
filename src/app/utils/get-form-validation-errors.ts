import {FormGroup} from "@angular/forms";

export function getFormValidationErrors(form: FormGroup, operation: string) {

  let keys = Object.keys(form.controls)
  for(let key of keys) {
    let temp = form.get(key)
    if (temp != null) {
      if (temp.errors != null) {
        return `Formularz ${operation} zawiera błędy`
      }
    }
  }
  return null
}
