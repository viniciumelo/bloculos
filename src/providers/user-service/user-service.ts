
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { User } from '../../models/user';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import firebase from 'firebase';


@Injectable()
export class UserServiceProvider {

  
  users: FirebaseListObservable<any>;
  
  constructor(
    public http: Http,
    public db: AngularFireDatabase
  ) { }

  create(user: User): firebase.Promise<void> {
    return this.db.list('/users/').push(user);
  }
  
    onCreate(user): firebase.Promise<any> {
      return firebase.auth().createUserWithEmailAndPassword(user.email, user.senha)
        .then(newUser => {
          firebase.database().ref('/users').child(newUser.uid)
            .set({ nome: user.nome, sobrenome: user.sobrenome, email: user.email, senha: user.senha  });
        });
    }
  
    loginUser(user): firebase.Promise<any> {
      return firebase.auth().signInWithEmailAndPassword(user.username, user.senha);
    }
}
