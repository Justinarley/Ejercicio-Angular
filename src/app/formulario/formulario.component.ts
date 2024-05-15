import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})

export class FormularioComponent implements OnInit {
  form: FormGroup;
  formSubmitted: boolean = false;
  msgs: any[] = [];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      cedula: ['', [Validators.required, Validators.pattern("[0-9]{10}")]],
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      apellidos: ['', [Validators.required, Validators.minLength(5)]],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.pattern("12345")]],
      // fecha: [null, Validators.required],
      telefono: ['', [Validators.required, Validators.pattern("[0-9]{9}")]]
    });
  }

  ngOnInit() {
  }

  get f() { return this.form.controls; }

  submitForm() {
    this.formSubmitted = true;
    if (this.form.valid && this.form.value.contrasena === '12345') {
      console.log('Formulario enviado correctamente');
      console.log('Datos del formulario:', this.form.value);
      this.msgs = [{severity:'success', summary:'Éxito', detail:'Datos guardados correctamente.'}];
      this.form.reset();
      this.formSubmitted = false;
    } else {
      console.log('Por favor, completa todos los campos correctamente');
      this.msgs = [{severity:'error', summary:'Error', detail:'Por favor, completa todos los campos correctamente.'}];
    }
  }
}
