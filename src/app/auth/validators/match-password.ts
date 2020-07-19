import { FormGroup } from '@angular/forms';

export function matchPassword(
  formGroup: FormGroup
): { [key: string]: boolean } | null {
  const { password, passwordConfirmation } = formGroup.value;

  if (password === passwordConfirmation) {
    return null;
  }

  return { passwordsDontMatch: true };
}
