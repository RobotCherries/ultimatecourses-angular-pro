import { Component } from "@angular/core";

import { User } from "./auth-form/auth-form.interface";

@Component({
  selector: "my-app",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.css"]
})
export class AppComponent {
  createUser(user: User) {
    console.log("Create account", user);
  }

  loginUser(user: User) {
    console.log("Login", user);
  }
}
