import { Component, OnInit } from '@angular/core';
// import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: '../profile/profile.component.html',
  styleUrls: ['../profile/profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  constructor() { }

  ngOnInit(): void {
     
  }
}
