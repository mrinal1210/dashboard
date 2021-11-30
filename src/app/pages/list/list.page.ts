import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})

export class ListPage implements OnInit {
  noUserData: boolean;
  data = [];

  constructor(
    private router: Router
  ) {
    const data = sessionStorage.getItem('user-data');
    if(data === null) {
      this.noUserData = true;
    } else {
      this.noUserData = false;
      this.data = JSON.parse(data);
    }
  }

  ngOnInit() {
    const data = sessionStorage.getItem('user-data');
    if(data === null) {
      this.noUserData = true;
    } else {
      this.noUserData = false;
      this.data = JSON.parse(data);
    }
  }

  updateEntry(index) {
    this.router.navigate(['/register'], {
      queryParams: this.data[index]
    });
  }

  deleteEntry(index) {
    this.data.splice(index, 1);
  }
}
