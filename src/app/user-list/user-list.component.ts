import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../backend.service';
import { User } from '../../user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  editForm: FormGroup;
  showEditForm: boolean = false;
  selectedUser: User | null = null;
  msgs: any[] = [];
  searchForm: FormGroup;
  foundUser: User | null = null;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private backendService: BackendService) {
    this.editForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern("[0-9]{9}")]]
    });
    this.searchForm = this.fb.group({
      id: ['', [Validators.required]]
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
    this.editForm.setValue({
      correo: user.correo,
      telefono: user.telefono
    });
    this.selectedUser = user;
    this.showEditForm = true;
  }

  submitEditForm() {
    if (this.editForm.valid && this.selectedUser) {
      const editedUserData = this.editForm.value;
      this.backendService.updateUser(this.selectedUser.id, editedUserData).subscribe(
        () => {
          this.showEditForm = false;
          this.msgs = [{ severity: 'success', summary: 'Éxito', detail: 'Usuario actualizado correctamente.' }];
          this.getUsers();
        },
        error => {
          console.error('Error al actualizar el usuario:', error);
          this.msgs = [{ severity: 'error', summary: 'Error', detail: 'Ocurrió un error al actualizar el usuario.' }];
        }
      );
    } else {
      this.msgs = [{ severity: 'error', summary: 'Error', detail: 'Por favor, completa correctamente el formulario de edición.' }];
    }
  }

  cancelEdit() {
    this.showEditForm = false;
    this.selectedUser = null;
    this.editForm.reset(); // Limpiar el formulario al cancelar
  }

  eliminarUsuario(id: number): void {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.backendService.deleteUser(id).subscribe(
        () => {
          this.getUsers();
          this.msgs = [{ severity: 'success', summary: 'Éxito', detail: 'Usuario eliminado correctamente.' }];
        },
        error => {
          console.error('Error al eliminar el usuario:', error);
          this.msgs = [{ severity: 'error', summary: 'Error', detail: 'Ocurrió un error al eliminar el usuario.' }];
        }
      );
    }
  }

  searchUserById() {
    if (this.searchForm.valid) {
      const userId = this.searchForm.get('id')?.value;
      this.backendService.getUserById(userId).subscribe(
        (user: User) => {
          if (user) {
            this.foundUser = user;
            this.errorMessage = ''; // Limpiar el mensaje de error si se encuentra el usuario
            this.msgs = [{ severity: 'success', summary: 'Éxito', detail: 'Usuario encontrado.' }];
          } else {
            this.foundUser = null;
            this.errorMessage = 'No se encontró el usuario con el ID proporcionado.';
            this.msgs = [{ severity: 'warn', summary: 'No encontrado', detail: this.errorMessage }];
          }
        },
        error => {
          this.foundUser = null;
          this.errorMessage = 'Ocurrió un error al buscar el usuario por ID.';
          console.error('Error al buscar el usuario por ID:', error);
          this.msgs = [{ severity: 'error', summary: 'Error', detail: this.errorMessage }];
        }
      );
    } else {
      this.foundUser = null;
      this.errorMessage = 'Por favor, ingresa un ID válido.';
      this.msgs = [{ severity: 'error', summary: 'Error', detail: this.errorMessage }];
    }
  }
}
