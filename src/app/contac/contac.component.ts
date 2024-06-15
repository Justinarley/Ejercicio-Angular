import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contac',
  templateUrl: './contac.component.html',
  styleUrls: ['./contac.component.css']
})
export class ContacComponent implements OnInit {
  form: FormGroup;
  formSubmitted: boolean = false;
  msgs: any[] = [];

  constructor(private fb: FormBuilder, private backendService: BackendService, private router: Router) {
    this.form = this.fb.group({
      cedula: ['', [Validators.required, Validators.pattern("[0-9]{10}")]],
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      apellidos: ['', [Validators.required, Validators.minLength(5)]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern("[0-9]{9}")]]
    });
  }

  ngOnInit(): void {}

  get f() { return this.form.controls; }

  submitForm() {
    this.formSubmitted = true;
    if (this.form.valid) {
      this.backendService.createUser(this.form.value)
        .subscribe(
          () => {
            this.msgs = [{ severity: 'success', summary: 'Éxito', detail: 'Datos guardados correctamente.' }];
            this.form.reset();
            this.formSubmitted = false;
            this.router.navigate(['/user-list']);
          },
          error => {
            this.msgs = [{ severity: 'error', summary: 'Error', detail: 'Ocurrió un error al guardar los datos.' }];
          }
        );
    } else {
      const camposInvalidos = this.getCamposInvalidos();
      const detalleMensaje = `Por favor, completa correctamente los siguientes campos: ${camposInvalidos.join(', ')}.`;
      this.msgs = [{ severity: 'error', summary: 'Error', detail: detalleMensaje }];
    }
  }

  getCamposInvalidos(): string[] {
    const invalidFields: string[] = [];
    for (const controlNombre in this.f) {
      if (this.f[controlNombre].invalid) {
        invalidFields.push(controlNombre);
      }
    }
    return invalidFields;
  }
}
