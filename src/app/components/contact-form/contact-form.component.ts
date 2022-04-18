import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact';
import { ContactService } from 'src/app/services/contact.service';
import {ActivatedRoute, Router} from '@angular/router'
import {MatDialog} from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

interface Food {
  value: boolean;
  viewValue: string;
}
@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  foods: Food[] = [
    {value: true, viewValue: 'Activo'},
    {value: false, viewValue: 'Inactivo'},
  ];

  contacto: Contact={
    id:0,
    nombre:'',
    telefono: '',
    correo: '',
    edad:0,
    activo:false
};

edit: boolean = false;
  constructor(private contactService:ContactService , private router:Router , private activeRoute:ActivatedRoute,public dialog: MatDialog) {
  
  }


  ngOnInit(): void {
      const params = this.activeRoute.snapshot.params;

     if (params['id']) {
       this.contactService.getContact(params['id']).subscribe(
        res =>{
            console.log(res)
             this.contacto = res;
             this.edit=true;
        },
        err => console.log(err)
       )
     }
}


  saveNewContact(){
    console.log(this.contacto);
    delete this.contacto.id;
    this.contactService.saveContact(this.contacto).subscribe(
      res =>{
        console.log(res);
        this.router.navigate(['/list']);
      },
      err => console.error(err)
    );
  }

  updateContact(){

    console.log(this.contacto);
    this.contactService.updateContact(this.contacto).subscribe(
      res =>{
        console.log(res);
      },
      err => console.error(err)
    );
  }
  
  
}
