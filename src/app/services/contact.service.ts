import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Contact } from '../models/contact'
import { Observable } from 'rxjs'
@Injectable({
  providedIn: 'root',
})
export class ContactService {
  API_URL = 'http://localhost:3000/api/contacto/'
  constructor(private http: HttpClient) {}

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.API_URL}all`)
  }

  getContact(id: string) {
    return this.http.get(`${this.API_URL}find/${id}`)
  }

  deleteContact(id: string) {
    return this.http.delete(`${this.API_URL}delete/${id}`)
  }

  saveContact(contact: Contact) {
    return this.http.post(`${this.API_URL}save`, contact)
  }

  updateContact(contact: Contact) {
    return this.http.post(`${this.API_URL}save`, contact)
  }
}
