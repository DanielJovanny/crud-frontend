import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import {MatDialog} from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Contact } from 'src/app/models/contact';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnInit {
  
  
  animal: string='';
  name: string='';


  displayedColumns: string[] = [
    'id',
    'nombre',
    'telefono',
    'correo',
    'edad',
    'activo',
    'opciones',
  ]
  dataSource: any = []
  contacto: Contact={
    id:0,
    nombre:'',
    telefono: '',
    correo: '',
    edad:0,
    activo:false
};

  constructor(private contactService: ContactService, public dialog: MatDialog) {}

  ngOnInit() {
    this.getContacts();
  }


  getContacts(){
    this.contactService.getContacts().subscribe(
      res => {
        console.log(res);
        this.dataSource = res
        console.log(this.dataSource)
      },
      err => console.log(err),
    )

  }
  deleteContact(id: string) {
    console.log(id)
    this.contactService.getContact(id).subscribe(
      res =>{
          console.log(res)
          this.contacto = res;
          const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '350px',
            data: '¿Seguro que desea borrar a ' + this.contacto.nombre +'?'
          });
      
          dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed '+ result);
            if (result) {
              this.contactService.deleteContact(id).subscribe(
                res => {
                  console.log(res);
                  this.getContacts();
                },
                err => console.log(err)
              );
            }
          });
      },
      err => console.log(err)
     )

   
   
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: 'Hola'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed '+ result);
    });
  }
  
  

  
}
