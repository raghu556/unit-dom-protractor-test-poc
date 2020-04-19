import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ShowDataComponent } from "./show-data/show-data.component";
import { LoginComponent } from "./login/login.component";
const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "/demo/login" },
  {
    path: "demo",
    children: [
      { path: "login", component: LoginComponent },
      { path: "showdata", component: ShowDataComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
