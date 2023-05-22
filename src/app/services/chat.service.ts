import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { Chat, Message } from 'src/app/models/chat.model';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  // URL API
  private readonly CONFIG_URL = 'http://localhost:3000';

  // ARRAY DE CHATS
  public chatList: Chat[] = []

  constructor(public http: HttpClient) {

  }

  // FUNCIÓN PARA HACER POST DE UN CHAT
  public postChat(chat: Chat): Observable<Category> {
    return this.http.post<Category>(`${this.CONFIG_URL}/chats`, chat)
  }

  // FUNCIÓN PARA HACER POST DE UN MENSAJE
  public postMsg(message: Message): Observable<Category> {
    return this.http.post<Category>(`${this.CONFIG_URL}/messages`, message)
  }

  // FUNCIÓN PARA OBTENER LOS MENSAJES Y ALMACENARLOS EN LA VAR PRIVADA
  public getMsg(msg: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.CONFIG_URL}/messages/?chatId=${msg}`)
  }

  public patchMsg(chatId: number, emit: number): Observable<Message> {
    const url = `${this.CONFIG_URL}/messages/?chatId=${chatId}&emit=${emit}&_sort=id&_order=desc&_limit=1`;
    const patchData = { "seen": true };

    return this.http.patch<Message[]>(url, patchData).pipe(
      map(response => response[0] as Message)
    );
  }

  // FUNCIÓN PARA HACER PUT DE UN CHAT
  public putChat(chat: Chat): Observable<Category> {
    return this.http.put<Category>(`${this.CONFIG_URL}/chats/${chat.id}`, chat)
  }

  // FUNCIÓN PARA OBTENER LOS CHATS Y ALMACENARLOS EN LA VAR PRIVADA
  public getChats(): Observable<void> {
    return this.http.get<Chat[]>(`${this.CONFIG_URL}/chats`)
      .pipe(map(((chats: Chat[]) => {
        this.chatList = chats
      })))
  }
  public getChat(id: number): Observable<Chat> {
    return this.http.get<Chat>(`${this.CONFIG_URL}/chats/${id}`)


  }
}
