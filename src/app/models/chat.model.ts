export interface Message {
  emit: number;
  offer?: string;
  message: string;
  image?: string;
  seen: boolean;
  created_at: Date;
  chatId: number;

}
export interface Offer {
  emit: number;
  offer: string;
  created_at: Date;
  state: number;
  chatId: number;

}
export interface Chat {
  id?: number;
  emit: number;
  productID: number;
  recept: number;
}
