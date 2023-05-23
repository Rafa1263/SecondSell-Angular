import { Pipe, PipeTransform } from '@angular/core'
import { Chat, Message } from 'src/app/models/chat.model';
import { Product } from 'src/app/models/product.model'


@Pipe({
  name: 'seen',
})
export class SeenPipe implements PipeTransform {
  transform(message: Message, userId: number): number {
    if (userId === message.emit) {
      return 0
    }
    else if (message.seen == false && userId !== message.emit) {
      console.log(message.emit)
      console.log(userId)
      return 2
    }
    else if (userId !== message.emit) {
      return 1
    }
    else { return 0 }

  }
}
