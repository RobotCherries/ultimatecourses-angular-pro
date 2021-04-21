import { Component } from "@angular/core";

@Component({
  selector: "auth-message",
  templateUrl: "./auth-message.component.html"
})
export class AuthMessageComponent {
  loggedInDays: number = 7;

  constructor() {}
}
