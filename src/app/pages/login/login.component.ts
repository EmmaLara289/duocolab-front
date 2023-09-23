import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
declare var jQuery: any;
declare var $: any;
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
  public page_title: string;
  mostrarFormulario = false;
  public user: User;
  public user_reg: User;
  public userTypes: any[] = [];
  public status: string;
  public token: string;
  public identity;
  public details;
  public data_error: string;
  public error_reg: string;
  public success_reg: string;
  public checkbox;
  public user_reg_aux: { name: string, surname: string, email_reg: string, email_hash: string, description: string, image: string, password_reg: string, password_repeat: string, key_type_user: any, key_business_type: any, role_user: string, enterprise_name: string, rfc: string, social_reason: string };
  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.page_title = 'Identificate';
    this.user = new User(1, '', '', '', '', '');
    this.user_reg = new User(1, '', '', '', '', '');
  }

  ngOnInit() {

  }

  login() {
    this._userService.login(this.user.email, this.user.password).subscribe(
      response => {
        if (response.status != 'error') {
          this.status = 'success';
          this.identity = response.user;
          localStorage.setItem('token', response.token);
          localStorage.setItem('identity', JSON.stringify(this.identity));
          Swal.fire('Bienvenido...', 'Ingreso realizado con éxito', 'success');
          this._router.navigate(['/']);
          this._userService.onSuccessLogin.emit();
        }

        
      },
      error => {
        Swal.fire('UPS', 'El usuario no se ha podido identificar.', 'error');
        this.status = 'error';
      }
    );
  }



}