import { Contact } from "models/contact";
import httpClient from "./httpclient";

export const getContacts = (): Promise<Contact[]> => httpClient.get('/contacts');

export const saveContact = (contact: Contact) => {
  console.log(contact);
  return httpClient.post('/contacts', contact)
};

export const updateContact = (contact: Contact) => httpClient.put(`/contacts/${contact.id}`, contact);

export const deleteContact = (contact: Contact) => httpClient.delete(`/contacts/${contact.id}`);
