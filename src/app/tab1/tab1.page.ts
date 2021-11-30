import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  form: FormGroup;
  username: string;
  password: string;

  constructor(
    private alertCtrl: AlertController,
    private router: Router
  ) {
    this.form = new FormGroup({
      username: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      password: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.minLength(5), Validators.maxLength(20)]
      })
    });
  }

  onLogin() {
    if(this.form.invalid) {
      return;
    } else {
      if(sessionStorage.length === 0) {
        this.showAlert();
        this.form.reset();
      } else if(sessionStorage.length >= 0) {
        const data = JSON.parse(sessionStorage.getItem('user'));
        this.username = this.form.value.username;
        this.password = this.form.value.password;
        if(data.username === this.username && data.password === this.password) {
          this.router.navigate(['/register']);
          this.form.reset();
        } else if(data.username !== this.username || data.password !== this.password) {
          this.userMisMatch();
        } else {
          this.showAlert();
        }
      }
    }
  }

  private showAlert() {
    this.alertCtrl.create({
      header: 'Alert',
      subHeader: 'No such user found in database.',
      message: 'Please register first then trying login again.',
      buttons: [
        {
          text: 'Go to registration',
          handler: () => {
            this.router.navigate(['/tabs/tab2']);
          }
        }
      ]
    }).then(alertEle => {
      alertEle.present();
    });
  }

  private userMisMatch() {
    this.alertCtrl.create({
      header: 'Attention!',
      message: 'Username or password is invalid.',
      buttons: [
        { text: 'okay' }
      ]
    }).then(alertEle => {
      alertEle.present();
    });
  }

}
