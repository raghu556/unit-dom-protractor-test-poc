import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AgGridModule } from "ag-grid-angular";
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ShowDataComponent } from "./show-data/show-data.component";
import { AuthenticationHttpInterceptor } from "./common//authentication-intercepter";
import { LoginComponent } from './login/login.component';
@NgModule({
  declarations: [AppComponent, ShowDataComponent, LoginComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    NgbDropdownModule,
    AppRoutingModule,
    AgGridModule.withComponents([])
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
