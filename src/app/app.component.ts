import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  form: FormGroup;
  formSubmitted: boolean = false;
  msgs: any;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      cedula: ['', [Validators.required, Validators.pattern("[0-9]{10}")]],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      fecha: [null, Validators.required],
      telefono: ['', [Validators.required, Validators.pattern("[0-9]{10}")]]
    });
  }

  ngOnInit() {
  }

  submitForm() {
    this.formSubmitted = true;
    if (this.form.valid) {
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
