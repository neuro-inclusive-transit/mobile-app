import { dbStore } from '~/stores/misc/dbStore';

export interface Contact {
  lastName: string;
  firstName: string;
  phone: string;
}

export const contacts = dbStore<Contact>('contacts', [
  {
    lastName: 'Kaestner',
    firstName: 'Sebastian',
    phone: '0176 12345678',
  },
  {
    lastName: 'Mustermann',
    firstName: 'Max',
    phone: '0176 87654321',
  },
  {
    lastName: 'Musterfrau',
    firstName: 'Maria',
    phone: '0176 12348765',
  }
]);
