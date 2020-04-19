import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  users = ["TestUser"];
  selectedUser = "Please select user";
  constructor(private readonly router: Router) {}

  ngOnInit() {}

  handleLogin() {
    this.router.navigate(["/demo/showdata"]);
  }

  handleUserSelect(user){
    this.selectedUser = user;
  }
}
