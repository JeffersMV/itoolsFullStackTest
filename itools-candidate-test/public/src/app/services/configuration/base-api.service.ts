import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SettingsService} from "./settings.service";
import {LocatorService} from "./locator.service";
import {FilterMetadata} from 'primeng/primeng';


export abstract class BaseApiService {
    protected settings: SettingsService;
    private http: HttpClient;
    private readonly defaultApi: string;
    private opts = BaseApiService.getOptions();

    public constructor() {
        this.http = LocatorService.injector.get(HttpClient);
        this.settings = LocatorService.injector.get(SettingsService);
        this.defaultApi = `${this.settings.baseUrl}`;
    }

    private static getOptions(): any {
        let opts: HttpHeaders = new HttpHeaders();
        opts = opts.append('Content-Type',  'application/json;charset=utf-8');
        // opts = opts.append('Accept', 'application/json');
        return {headers: opts};
    }

    public get(link: string): Observable<any> {
        return this.http.get(this.defaultApi + link, this.opts);
    }

    public put(link: string, data: any): Observable<object> {
        return this.http.put(this.defaultApi + link, data, this.opts);
    }

    public post(link: string, data: any): Observable<object> {
        return this.http.post(this.defaultApi + link, data, this.opts);
    }

    public delete(link: string): Observable<object> {
        return this.http.delete(this.defaultApi + link, this.opts);
    }

    public getPerPage(link: string, page: number, size: number, customFilters: object, filters?: { [s: string]: FilterMetadata; }, sortField?: string, sortOrder?: number): Observable<object> {
        let url = this.defaultApi + link + '?page=' + page + '&size=' + size;
        if (filters) {
            let keys = Object.keys(filters);

            for (let propName of keys) {
                let propValue = filters[propName].value;
                url += '&' + propName + '=' + propValue;
            }
        }
        if (customFilters) {
            let keys = Object.keys(customFilters);

            for (let propName of keys) {
                let propValue = customFilters[propName];
                url += '&' + propName + '=' + propValue;
            }
        }
        if (sortField) {
            url += '&sortField=' + sortField;
        }
        if (sortOrder) {
            url += '&sortOrder=' + sortOrder;
        }
        return this.http.get(url, this.opts);
    }
}