import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { AuthFormComponent } from "./auth-form.component";
import { AuthRememberComponent } from "./auth-remember/auth-remember.component";

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [AuthRememberComponent, AuthFormComponent],
  exports: [AuthFormComponent]
})
export class AuthFormModule {}
