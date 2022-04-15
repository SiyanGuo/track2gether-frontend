import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from "../../services/auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: '../profile/profile.component.html',
  styleUrls: ['../profile/profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  constructor(private token: TokenStorageService) { }

  ngOnInit(): void {
     this.currentUser = this.token.getUser();
  }
}
