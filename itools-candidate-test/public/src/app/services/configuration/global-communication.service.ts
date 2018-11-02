import {Injectable} from '@angular/core';
import {Message} from 'primeng/primeng';

@Injectable()
export class GlobalCommunicationService {
    public messages: Message[] = [];

    public showMessages(messages: Message[]) {
        this.messages = messages;
    }
}
