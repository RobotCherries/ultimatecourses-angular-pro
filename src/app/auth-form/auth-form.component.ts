import {
  Component,
  Output,
  EventEmitter,
  QueryList,
  ViewChild,
  ViewChildren,
  AfterViewInit,
  ContentChild,
  ContentChildren,
  AfterContentInit,
  ChangeDetectorRef,
  ElementRef
} from "@angular/core";

import { User } from "./auth-form.interface";
import { AuthMessageComponent } from "./auth-message/auth-message.component";
import { AuthRememberComponent } from "./auth-remember/auth-remember.component";

@Component({
  selector: "auth-form",
  templateUrl: "auth-form.component.html",
  styleUrls: ["auth-form.component.scss"]
})
export class AuthFormComponent implements AfterViewInit, AfterContentInit {
  // Inputs & Outputs
  @Output() submitted: EventEmitter<User> = new EventEmitter<User>();

  // View & Content Children
  @ViewChild("email")
  emailFieldRef: ElementRef;
  @ViewChild(AuthMessageComponent)
  authMessage: AuthMessageComponent;
  @ViewChildren(AuthMessageComponent)
  authMessages: QueryList<AuthMessageComponent>;

  @ContentChild(AuthRememberComponent)
  authRemember: AuthRememberComponent;
  @ContentChildren(AuthRememberComponent)
  authRemembers: QueryList<AuthRememberComponent>;

  // Booleans
  showAuthRememberMessage: boolean = false;

  constructor(private cdRef: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.initForm();
    this.initFormMessages();
  }

  ngAfterContentInit(): void {
    this.renderFormMessages();
  }

  onSubmit(value: User) {
    this.submitted.emit(value);
  }

  initForm(): void {
    this.emailFieldRef.nativeElement.setAttribute(
      "placeholder",
      "Enter your email address"
    );
    this.emailFieldRef.nativeElement.classList.add("email");
    this.emailFieldRef.nativeElement.focus();
  }

  initFormMessages(): void {
    // View Children
    // Change AuthMessage component properties
    if (this.authMessage) {
      this.authMessage.loggedInDays = 30;
      this.cdRef.detectChanges();
    }

    // Subscribe to the AuthMessage QueryList of components
    if (this.authMessages) {
      this.authMessages.forEach((am: AuthMessageComponent) => {
        am.loggedInDays = 30;
      });
      this.cdRef.detectChanges();
    }
  }

  renderFormMessages(): void {
    // Content Children

    // Subscribe to the AuthRemember component
    if (this.authRemember) {
      this.authRemember.check.subscribe((isChecked: boolean) => {
        this.showAuthRememberMessage = isChecked;
      });
    }

    // Subscribe to the AuthRemember QueryList of components
    if (this.authRemembers) {
      this.authRemembers.forEach((r: AuthRememberComponent) => {
        r.check.subscribe(
          (isChecked: boolean) => (this.showAuthRememberMessage = isChecked)
        );
      });
    }
  }
}
