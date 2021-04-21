import { Component } from "@angular/core";

@Component({
  selector: "app-auth-message",
  templateUrl: "./auth-message.component.html"
})
export class AuthMessageComponent {
  loggedInDays: number = 7;

  constructor() {}
}
