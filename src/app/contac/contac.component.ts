import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../backend.service';
import { User } from '../../user';

@Component({
  selector: 'app-contac',
  templateUrl: './contac.component.html',
  styleUrls: ['./contac.component.css']
})
export class ContacComponent implements OnInit {
  form: FormGroup;
  formSubmitted: boolean = false;
  msgs: any[] = [];
  users: User[] = [];
  editForm: FormGroup; 
  showEditForm: boolean = false;
  selectedUser: User | null = null; // Variable para almacenar el usuario seleccionado

  constructor(private fb: FormBuilder, private backendService: BackendService) {
    this.form = this.fb.group({
      cedula: ['', [Validators.required, Validators.pattern("[0-9]{10}")]],
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      apellidos: ['', [Validators.required, Validators.minLength(5)]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern("[0-9]{9}")]]
    });
    // Inicializar el formulario de edición
    this.editForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern("[0-9]{9}")]]
    });
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.backendService.getUsers()
      .subscribe(
        (users: User[]) => this.users = users,
        error => console.error('Error al obtener los usuarios:', error)
      );
  }
  
  editarUsuario(user: User): void {
    // Llenar el formulario de edición con los datos del usuario seleccionado
    this.editForm.setValue({
      correo: user.correo,
      telefono: user.telefono
    });
    // Mostrar el formulario de edición
    this.selectedUser = user;
    this.showEditForm = true;
  }
  
  submitEditForm() {
    if (this.editForm.valid && this.selectedUser) {
      const editedUserData = this.editForm.value;
      // Llamar al servicio para actualizar el usuario
      this.backendService.updateUser(this.selectedUser.id, editedUserData).subscribe(
        () => {
          console.log('Usuario actualizado correctamente');
          this.showEditForm = false; // Ocultar el formulario después de la edición
          this.msgs = [{ severity: 'success', summary: 'Éxito', detail: 'Usuario actualizado correctamente.' }];
          this.getUsers(); // Actualizar la lista de usuarios después de editar uno
        },
        error => console.error('Error al actualizar el usuario:', error)
      );
    } else {
      // Si el formulario no es válido, muestra un mensaje de error
      this.msgs = [{ severity: 'error', summary: 'Error', detail: 'Por favor, completa correctamente el formulario de edición.' }];
    }
  }
  
  eliminarUsuario(id: number): void {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.backendService.deleteUser(id).subscribe(
        () => {
          console.log('Usuario eliminado correctamente');
          this.getUsers(); // Actualizar la lista de usuarios después de eliminar uno
        },
        error => console.error('Error al eliminar el usuario:', error)
      );
    }
  }

  get f() { return this.form.controls; }

  submitForm() {
    this.formSubmitted = true;
    if (this.form.valid) {
      console.log('Formulario enviado correctamente');
      console.log('Datos del formulario:', this.form.value);

      this.backendService.createUser(this.form.value)
        .subscribe(
          () => {
            this.msgs = [{ severity: 'success', summary: 'Éxito', detail: 'Datos guardados correctamente.' }];
            this.form.reset();
            this.formSubmitted = false;
            this.getUsers(); // Actualizar la lista de usuarios después de crear uno nuevo
          },
          error => {
            console.error('Error al guardar los datos:', error);
            this.msgs = [{ severity: 'error', summary: 'Error', detail: 'Ocurrió un error al guardar los datos.' }];
          }
        );
    } else {
      console.log('Por favor, completa todos los campos correctamente');
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
