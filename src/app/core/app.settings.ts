import { Injectable } from '@angular/core';
import { Settings } from './app.settings.model';

@Injectable()
export class AppSettings {
    public settings = new Settings(
        'basf-red',   // indigo-light, teal-light, red-light, gray-light, blue-dark, green-dark, pink-dark, gray-dark
    );
}

