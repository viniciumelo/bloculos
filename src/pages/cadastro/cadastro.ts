import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { UserServiceProvider } from './../../providers/user-service/user-service';

import { TabsPage } from './../tabs/tabs';


@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage implements OnInit {

  userForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public userService: UserServiceProvider,
    public toastCtrl: ToastController,
    public alertController: AlertController
  ) {

  }

  ngOnInit() {
    this.validarCampos();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
  }

  validarCampos(): void {
    let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.userForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      sobrenome: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      
    })
  }

  onCreate() {
    this.userService.onCreate(this.userForm.value).then(() => {
      let alert = this.alertController.create({
        title: 'Sucesso',
        subTitle: 'Cadastro realizado com sucesso !',
        buttons: ['OK']
      });
      alert.present();
      this.userForm.reset();
      this.navCtrl.setRoot(TabsPage);
    })
      .catch(err => {
        let alert = this.alertController.create({
          title: 'Aviso',
          subTitle: 'Este email já está sendo usado por outro usuario !',
          buttons: ['OK']
        });
        alert.present();
      });
  }


}
