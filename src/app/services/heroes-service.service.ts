import { HeroeModel } from './../models/heroe.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map,delay} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HeroesServiceService {
  private REST_API = 'https://heroes-251c5.firebaseio.com';
  constructor(private http: HttpClient) { }

  crearHeroe$(heroe: HeroeModel) {
    return this.http.post(`${this.REST_API}/heroes.json`, heroe).pipe(map((res:any)=>{
      heroe.id = res.name;
      return heroe;
    }));
  }
  getHeroes$(){
    return this.http.get(`${this.REST_API}/heroes.json`).pipe(map(this.ArregloConver),delay(0));
  }

  private ArregloConver(heroesObject : Object){
    const heroes: HeroeModel[] = [];

    if(heroesObject === null ) { return [];}

    Object.keys(heroesObject).forEach(key => {
      const heroe: HeroeModel = heroesObject[key];
      heroe.id = key;
      heroes.push(heroe);
    })
    return heroes;
  }

  getHeroe$(id:string){
    return this.http.get(`${this.REST_API}/heroes/${id}.json`);
  }

  updateHeroe$(heroe:HeroeModel){

    const heroeTemp = {
      ...heroe
    };

    delete heroe.id;

    return this.http.put(`${this.REST_API}/heroes/${heroe.id}.json`, heroe);

  }

  deleteHeroe$(id:string){
    return this.http.delete(`${this.REST_API}/heroes/${id}.json`);
  }
}
