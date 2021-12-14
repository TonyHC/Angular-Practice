import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { AuthRouteModule } from "./auth-routing.module";
import { AuthComponent } from "./auth.component";

@NgModule({
    declarations: [
        AuthComponent
    ],
    imports: [
        SharedModule,
        FormsModule,
        AuthRouteModule
    ]
})
export class AuthModule { }