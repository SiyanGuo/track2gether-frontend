// import { Component, OnInit } from '@angular/core';
// import { UserService } from '../_services/user.service'

// @Component({
//   selector: 'app-home',
//   templateUrl: '../home/home.component.html',
//   styleUrls: ['../home/home.component.css']
// })
// export class HomeComponent implements OnInit {
//   content?: string;
//   constructor(private userService: UserService) { }

//   ngOnInit(): void {
//     this.userService.getPublicContent().subscribe(
//       data => {
//         this.content = data;
//       },
//       err => {
//         this.content = JSON.parse(err.error).message;
//       }
//     );
//   }

// }


import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserInfo } from "src/app/models/user-info";
// import { User } from "src/app/models/user-models;
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  email: any;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // this.authService.getUserInfoFromJwt().subscribe(
    //   (res) => {
    //     const userInfo: UserInfo = res.body;

    //     this.email = userInfo.email;
    //   },
      // (err) => {
      //   if (err.status === 401) {
      //     this.router.navigate(["/login"]);
      //   }
      // }
    // );
  }
}