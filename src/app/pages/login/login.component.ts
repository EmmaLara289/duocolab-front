import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { CheckUser } from '../../services/checkUser';
import Swal from 'sweetalert2';
import { NbSpinnerService } from '@nebular/theme';

//import { NbMenuItem } from '@nebular/theme';
//import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
  public user: User;
  valor: any;

  constructor(
    private NbSpinnerService: NbSpinnerService,
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute,
    private CheckUser: CheckUser
  ) {
    this.user = new User(1, '', '', '', '', 1);
    //this.user_reg = new User(1, '', '', '', '', '');
  }

  ngOnInit() {
    
    const aux = (localStorage.getItem('respuesta'));
    this.CheckUser.menu = JSON.parse(aux);
    this.CheckUser.userData = JSON.parse(localStorage.getItem('userData'));
    console.log(this.CheckUser.userData);
    console.log(this.CheckUser.menu);
    this.CheckUser.login = JSON.parse(localStorage.getItem('login'));
    //console.log()
    if(this.CheckUser.login === true){
      this._router.navigate(['/pages/mis-tareas']);
      this.valor = false;
      this.loadMenu();
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
          
          this.CheckUser.userData = response.user;
          localStorage.setItem('userData', JSON.stringify(this.CheckUser.userData));
          this.CheckUser.login = true;
          localStorage.setItem('login', JSON.stringify(this.CheckUser.login));
          this.loadMenu();
          if(response.user.key_role == 1){
            window.location.href = window.location.href;
          }else if(response.user.key_role == 2){
            window.location.href = window.location.href;
          }else if(response.user.key_role == 3){
            window.location.href = window.location.href;
          }
        }
        /*
        setTimeout(function() {
          window.location.href = window.location.href;
          // Puedes colocar aquí el código que deseas ejecutar después de 3 segundos
        }, 3000); // 3000 milisegundos (3 segundos)
       */
        
      },
      error => {
        Swal.fire('UPS', 'El usuario no se ha podido identificar.', 'error');
      }
    );
  }

  loadMenu() {
    this._userService.getUserMenu(this.CheckUser.userData.id).subscribe((response) => {
      console.log(response);
      this.CheckUser.menu = response;
      //this.CheckUser.menu = response;
              // Guarda solo los datos del menú en localStorage
      localStorage.setItem('respuesta', JSON.stringify(this.CheckUser.menu));
      if(this.valor !== false){
        localStorage.setItem('menu', JSON.stringify(1));
      }
      });
  }
  

}