import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "auth-remember",
  templateUrl: "auth-remember.component.html"
})
export class AuthRememberComponent {
  @Output() check: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  onCheck(value: boolean): void {
    this.check.emit(value);
  }
}
