import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EjemploService {
  getProducts(): number {
    throw new Error('Method not implemented.');
  }

  constructor() { }

  contacPersonal(){
    return (['0961482200'])
  }
}
