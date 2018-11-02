import { Injectable } from '@angular/core';
import { ConfigService } from '@ngx-config/core';

@Injectable()
export class SettingsService {
    private settings: any;

    constructor(config: ConfigService) {
        this.settings = config.getSettings();
    }

    public get baseUrl() {
        return this.settings.baseUrl;
    }

    public get rowsCount() {
        return this.settings.rowsCount;
    }
}
