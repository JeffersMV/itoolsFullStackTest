import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {BaseApiService} from "./configuration/base-api.service";


@Injectable()
export class OptionsService extends BaseApiService {
    private apiOptionsUrl: string = '/api/options/';


    public getAutorItems(): Observable<any> {
        return this.get(this.apiOptionsUrl + 'authors');
    }

    public getBookItems(): Observable<any> {
        return this.get(this.apiOptionsUrl + 'books');
    }
}
