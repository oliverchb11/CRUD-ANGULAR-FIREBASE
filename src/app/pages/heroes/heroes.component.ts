import { HeroeModel } from './../../models/heroe.model';
import { HeroesServiceService } from './../../services/heroes-service.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
heroes: HeroeModel[] = [];
cargando=true;
  constructor(private heroeService: HeroesServiceService) { }

  ngOnInit(): void {
    this.cargando = true;
    this.getHeroes();
  }
  getHeroes() {
    this.heroeService.getHeroes$().subscribe((data) => {
      this.heroes = data;
      this.cargando = false;
      console.log('array',this.heroes);
    });
  }


  eliminarHeroe(heroe:HeroeModel,i:number){

    Swal.fire({
      title:'¿Esta Seguro?',
      text:`Esta seguro que desea eliminar a ${heroe.nombre}`,
      icon:'question',
      showConfirmButton:true,
      showCancelButton:true,
    }).then((res)=>{
      if(res.value){
        this.heroes.splice(i,1);
        this.heroeService.deleteHeroe$(heroe.id).subscribe();
      }
    });

  }

}
