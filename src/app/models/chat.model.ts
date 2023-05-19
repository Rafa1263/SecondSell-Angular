export interface Message {
  emit: number;
  message: string;
  image?: string;
  seen: boolean;
  created_at: Date;
}
export interface Offer {
  emit: number;
  offer: string;
  created_at: Date;
  state: number;

}
export interface Chat {
  id?: number;
  emit: number;
  productID: number;
  recept: number;
  conversation: Message[];
  offers: Offer[];

}
