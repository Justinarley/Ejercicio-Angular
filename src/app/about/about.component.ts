import { Component, OnInit } from '@angular/core';
import { EjemploService } from '../ejemplo.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {
  info: { nombre: string, descripcion: string } | undefined;

  constructor(private ejemploService: EjemploService) {}

  ngOnInit() {
    this.info = this.ejemploService.getInfo();
    console.log(this.info);
  }
}
