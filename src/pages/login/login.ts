
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { UserServiceProvider } from './../../providers/user-service/user-service';

import { TabsPage } from './../tabs/tabs';

import firebase from 'firebase';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup;
  
    constructor(
      private afAuth: AngularFireAuth,
      public navCtrl: NavController,
      public navParams: NavParams,
      public formBuilder: FormBuilder,
      public toastCtrl: ToastController,
      public loadingController: LoadingController,
      public alertController: AlertController
    ) {
    }
  
    ngOnInit() {
      this.validarCampos();
    }
  
    
  
   
    validarCampos(): void {
      let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
      this.loginForm = this.formBuilder.group({
        email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
        senha: ['', [Validators.required, Validators.minLength(6)]],
      })
    }
  
    ionViewDidLoad() {
      console.log('ionViewDidLoad LoginPage');
    }
  
    
    login() {
      let loading = this.loadingController.create({
        content: 'Aguarde...'
      });
      loading.present();
      this.afAuth.auth.signInWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.senha)
        .then(auth => {
          loading.dismiss();
          this.navCtrl.setRoot(TabsPage);
        })
        .catch(err => {
          loading.dismiss();
          let alert = this.alertController.create({
            title: 'Aviso',
            subTitle: 'Email ou senha incorretos! Tente novamente!',
            buttons: ['OK']
          });
          alert.present();
        });
    }
    
  
  }

