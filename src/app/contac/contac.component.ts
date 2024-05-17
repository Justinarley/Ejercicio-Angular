import { Component } from '@angular/core';
import { EjemploService } from '../ejemplo.service';

@Component({
  selector: 'app-contac',
  templateUrl: './contac.component.html',
  styleUrl: './contac.component.css'
})
export class ContacComponent {
  contacts: string[] | undefined
  constructor(private ejemploService: EjemploService) {}
  ngOnInit() {
    this.contacts = this.ejemploService.contacPersonal();
    console.log(this.contacts);
  }

}
