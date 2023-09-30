import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
declare var jQuery: any;
declare var $: any;
import { NgForm } from '@angular/forms';


@Component({
  selector: "app-register",
  templateUrl: "./register.component.html"
})

export class RegisterComponent implements OnInit {
  public user: User;
  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.user = new User(1, '', '', '', '', '');
  }

  ngOnInit() {

  }

  register(){
  this._userService.register(this.user.name, this.user.email, this.user.password).subscribe(
    response => {
      if (response.status != 'error') {
          Swal.fire('Registro realizado con éxito', 'success');
          this._router.navigate(['/auth/login']);
      }
    },
    error => {
        Swal.fire('UPS', 'El usuario no se ha podido registrar.', 'error');
      }
  );
  }


}