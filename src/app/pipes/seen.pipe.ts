import { Pipe, PipeTransform } from '@angular/core'
import { Chat } from 'src/app/models/chat.model';
import { Product } from 'src/app/models/product.model'


@Pipe({
  name: 'seen',
})
export class SeenPipe implements PipeTransform {
  transform(chat: Chat, userId: number): number {
    if (chat.conversation[chat.conversation.length - 1].emit === userId && chat.conversation[chat.conversation.length - 1].seen == true) {
      return 1
    }
    else if (chat.conversation[chat.conversation.length - 1].emit === userId && chat.conversation[chat.conversation.length - 1].seen == false) {

      return 2
    }
    return 3

  }
}
