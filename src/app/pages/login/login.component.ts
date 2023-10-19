import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { CheckUser } from '../../services/checkUser';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {

  public user: User;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute,
    private ChekUser: CheckUser
  ) {
    this.user = new User(1, '', '', '', '', 1);
    //this.user_reg = new User(1, '', '', '', '', '');
  }

  ngOnInit() {
    this.ChekUser.userData = JSON.parse(localStorage.getItem('userData'));
    console.log(this.ChekUser.userData);
    this.ChekUser.login = JSON.parse(localStorage.getItem('login'));
    //console.log()
    if(this.ChekUser.login === true){
      this._router.navigate(['/pages/colaborador']);
    }
  }

  register(){
    this._router.navigate(['/auth/register']);
  }

  login() {
    this._userService.login(this.user.email, this.user.password).subscribe(
      response => {
        if (response.status != 'error') {
//          console.log(response.user);
          this.ChekUser.userData = response.user;
          localStorage.setItem('userData', JSON.stringify(this.ChekUser.userData));
          this.ChekUser.login = true;
          localStorage.setItem('login', JSON.stringify(this.ChekUser.login));
          if(response.user.key_role == 1){
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Bienvenido Administrador',
              showConfirmButton: false,
              timer: 1200
            });
            this._router.navigate(['/pages/colaborador']);
          }else if(response.user.key_role == 2){
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Bienvenido Colaborador',
              showConfirmButton: false,
              timer: 1200
            });
            this._router.navigate(['/pages/colaborador']);
          }else if(response.user.key_role == 3){
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Bienvenido Coordinador',
              showConfirmButton: false,
              timer: 1200
            });
            this._router.navigate(['/pages/ticket']);
          }
        }

        
      },
      error => {
        Swal.fire('UPS', 'El usuario no se ha podido identificar.', 'error');
      }
    );
  }



}