export type ContactType = 'phone' | 'whatsapp' | 'email';

export interface IContact {
  type: ContactType;
  value: string;
}
