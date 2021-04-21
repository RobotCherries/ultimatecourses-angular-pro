import {
  Component,
  Output,
  EventEmitter,
  ContentChild,
  AfterContentInit,
  ContentChildren,
  QueryList
} from "@angular/core";

import { User } from "./auth-form.interface";
import { AuthRememberComponent } from "./auth-remember/auth-remember.component";

@Component({
  selector: "auth-form",
  templateUrl: "auth-form.component.html"
})
export class AuthFormComponent implements AfterContentInit {
  @Output() submitted: EventEmitter<User> = new EventEmitter<User>();

  @ContentChild(AuthRememberComponent) remember: AuthRememberComponent;
  // @ContentChildren(AuthRememberComponent)
  // remembers: QueryList<AuthRememberComponent>;

  showAuthRememberMessage: boolean = false;

  constructor() {}

  ngAfterContentInit(): void {
    this.showFormMessages();
  }

  onSubmit(value: User) {
    this.submitted.emit(value);
  }

  showFormMessages(): void {
    if (this.remember) {
      // Subscribe to the RememberMe component
      this.remember.check.subscribe(
        (isChecked: boolean) => (this.showAuthRememberMessage = isChecked)
      );

      // Subscribe to the RememberMe QueryList of components
      // this.remembers.forEach((r: AuthRememberComponent) => {
      //   r.check.subscribe(
      //     (isChecked: boolean) => (this.showAuthRememberMessage = isChecked)
      //   );
      // });
    }
  }
}
