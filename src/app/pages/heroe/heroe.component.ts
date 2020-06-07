import { HeroesServiceService } from './../../services/heroes-service.service';
import { HeroeModel } from './../../models/heroe.model';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from "sweetalert2";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.scss']
})
export class HeroeComponent implements OnInit {
  heroe: HeroeModel = new HeroeModel();

  constructor(private heroeService : HeroesServiceService,private router:ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.router.snapshot.paramMap.get('id');
    if(id !=='nuevo'){
      this.heroeService.getHeroe$(id).subscribe((data:HeroeModel)=>{
        this.heroe = data;
        this.heroe.id = id;
        console.log( this.heroe);
      });
    }
    console.log(id);
  }
/*TODO: falta acciones al boton*/
  guardar(form: NgForm){
    if (form.invalid) {
      console.log('formulario no valido');
      return;
    }

    Swal.fire({
      title:'Espere...',
      text:'Guardando Información',
      icon:'info',
      allowOutsideClick:false,
    })
    Swal.showLoading();

    if (this.heroe.id) {
      Swal.fire({
        title:'Usuario Actualizado',
        text:'El usuario a sido Aactualizado Correctamente',
        icon:'info',
      });

        this.updateHeroe();
    } else {
      Swal.fire({
        title:'Usuario Creado Correctamente',
        text:'El usuario a sido creado Correctamente',
        icon:'success',
      });
      this.createHeore();
      form.reset();
    }



  }
  createHeore() {
    this.heroeService.crearHeroe$(this.heroe).subscribe((data) => {
      console.log(data);
    });
  }
  updateHeroe() {
    this.heroeService.updateHeroe$(this.heroe).subscribe((data) => {
      console.log(data);
    });
  }



}
