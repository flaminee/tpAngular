import { Component, OnInit } from '@angular/core';
import {PokeDetail, Pokemon} from "../pokemon";
import {PokemonServiceService} from "../pokemon-service.service";
import {PokeShareInfoService} from "../poke-share-info.service";

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.css'],
  providers : [PokemonServiceService, PokeShareInfoService]
})
export class MyComponentComponent implements OnInit {

  id: string = '';
  pokes : Pokemon[] = [];
  currentPoke : string = '';
  searchPoke : string = "";
  pokeDetail : PokeDetail | undefined

  constructor(private pokeService : PokemonServiceService ,
              private  pokeShareInfoService : PokeShareInfoService
  ){

  }

  ngOnInit(): void {
    this.pokeService.getPokemons().subscribe( (data) => {
      data.results.forEach((e, index) => {
        this.pokes.push((new Pokemon('' + index, e.name)))
      })
    })
  }

  go() {
    this.pokeShareInfoService.setValue(this.currentPoke)
    if (this.currentPoke != ''){
      this.pokeService.getPokemonInfo((Number(this.currentPoke)  +  1).toString() ).subscribe(data => this.pokeDetail = data)
    }
  }



}
