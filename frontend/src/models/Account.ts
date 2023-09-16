import { Entity } from '@/api/api';

export default interface Account extends Entity {
  accountType: number;
  currency: string;
  name: string;
  balance: number;
}
