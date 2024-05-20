import { Component } from '@angular/core';
import { EjemploService } from '../ejemplo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  contacts: string[] | undefined
  constructor(private ejemploService: EjemploService) {}
  ngOnInit() {
    this.contacts = this.ejemploService.contacPersonal();
    console.log(this.contacts);
  }

}
