import {Component} from '@angular/core';
import {GlobalCommunicationService} from "./services/configuration/global-communication.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Library Of Books';
    public constructor(public communication: GlobalCommunicationService){

    }
}
