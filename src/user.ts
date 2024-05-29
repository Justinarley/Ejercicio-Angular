export class User {
    id!: number;
    cedula: string;
    nombre: string;
    apellidos: string;
    correo: string;
    telefono: string;
  
    constructor() {
      this.cedula = '';
      this.nombre = '';
      this.apellidos = '';
      this.correo = '';
      this.telefono = '';
    } 
  }