import {
  Component,
  Output,
  EventEmitter,
  ContentChild,
  AfterContentInit,
  ContentChildren,
  QueryList,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef
} from "@angular/core";

import { User } from "./auth-form.interface";
import { AuthMessageComponent } from "./auth-message/auth-message.component";
import { AuthRememberComponent } from "./auth-remember/auth-remember.component";

@Component({
  selector: "auth-form",
  templateUrl: "auth-form.component.html"
})
export class AuthFormComponent implements AfterViewInit, AfterContentInit {
  // Inputs & Outputs
  @Output() submitted: EventEmitter<User> = new EventEmitter<User>();

  // View & Content Children
  @ViewChild(AuthMessageComponent) authMessage: AuthMessageComponent;
  // @ViewChildren(AuthMessageComponent) authMessages: QueryList<AuthMessageComponent>;

  @ContentChild(AuthRememberComponent) authRemember: AuthRememberComponent;
  // @ContentChildren(AuthRememberComponent) authRemembers: QueryList<AuthRememberComponent>;

  // Booleans
  showAuthRememberMessage: boolean = false;

  constructor(private cdRef: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.initFormMessages();
  }

  ngAfterContentInit(): void {
    this.renderFormMessages();
  }

  onSubmit(value: User) {
    this.submitted.emit(value);
  }

  initFormMessages(): void {
    // View Children
    if (this.authMessage) {
      this.authMessage.loggedInDays = 30;
      this.cdRef.detectChanges();
    }
  }

  renderFormMessages(): void {
    // Content Children
    if (this.authRemember) {
      // Subscribe to the RememberMe component
      this.authRemember.check.subscribe((isChecked: boolean) => {
        this.showAuthRememberMessage = isChecked;
      });

      // Subscribe to the RememberMe QueryList of components
      // this.remembers.forEach((r: AuthRememberComponent) => {
      //   r.check.subscribe(
      //     (isChecked: boolean) => (this.showAuthRememberMessage = isChecked)
      //   );
      // });
    }
  }
}
