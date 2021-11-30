import { Component } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
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
      email: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(10), Validators.minLength(5)]
      }),
      confirmPassword: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(10), Validators.minLength(5)]
      })
    });
  }


  onRegister() {
    if(this.form.invalid) {
      return;
    } else {
      this.validatePassword();
    }
  }

  private validatePassword() {
    const npassword = this.form.value.password;
    const nconfirmPassword = this.form.value.confirmPassword;
    if(npassword !== nconfirmPassword) {
      this.showPasswordMismatch();
    } else {
      this.showAlert();
      const user = {
        username: this.form.value.username,
        password: this.form.value.password
      };
      this.form.reset();
      sessionStorage.setItem('user', JSON.stringify(user));
    }
  }

  private showAlert() {
    this.alertCtrl.create({
      header: 'Congratulations',
      subHeader: 'New user has been created.',
      message: 'Please login.',
      buttons: [
        {
          text: 'Go to login',
          handler: () => {
            this.router.navigate(['/tabs/tab1']);
          }
        }
      ]
    }).then(alertEle => {
      alertEle.present();
    });
  }

  private showPasswordMismatch() {
    this.alertCtrl.create({
      header: 'Attention!',
      message: 'Password do mat match. Please try again.',
      buttons: [
        {
          text: 'okay'
        }
      ]
    }).then(alertEle => {
      alertEle.present();
    });
  }
}
