/* eslint-disable id-blacklist */
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  form: FormGroup;
  userName: string;
  userEmail: string;
  userPhoneNumber: number;
  userCity: string;

  constructor(
    private alertCtrl: AlertController,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.activatedRoute.queryParams.subscribe((res) => {
      this.form.get('name').setValue(res.name);
      this.form.get('email').setValue(res.email);
      this.form.get('phoneNumber').setValue(res.phoneNumber);
      this.form.get('city').setValue(res.city);
    });

    this.form = new FormGroup({
      name: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      email: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.email]
      }),
      phoneNumber: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.minLength(10), Validators.maxLength(10)]
      }),
      city: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });
  }

  onSubmit() {
    if(this.form.invalid) {
      return;
    } else {
      this.checkPhonenNumber(this.form.value.phoneNumber);
    }
  }

  private checkPhonenNumber(number) {
    if(number.toString().length === 10) {
      let data;
      if(sessionStorage.getItem('user-data') === null ) {
        data = [];
      } else {
        data = JSON.parse(sessionStorage.getItem('user-data'));
      }
      const userData = {
        name: this.form.value.name,
        email: this.form.value.email,
        phoneNumber: this.form.value.phoneNumber,
        city: this.form.value.city
      };
      data.push(userData);
      this.form.reset();
      sessionStorage.setItem('user-data', JSON.stringify(data));
    } else {
      this.alertCtrl.create({
        header: 'Attention!',
        message: 'Phone number length should be 10 digits only.',
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
}
