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
    return (['0961482200' , 'Justin Altamirano'])
  }
  getInfo(): { nombre: string, descripcion: string } {
    return {
      nombre: 'Mi Empresa',
      descripcion: 'Somos una empresa dedicada a proporcionar soluciones innovadoras.'
    };
  }

}
