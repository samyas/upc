import { Component } from '@angular/core';
import { Settings } from './core/app.settings.model';
import { AppSettings } from './core/app.settings';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public settings: Settings;
  constructor(public appSettings: AppSettings) {
      this.settings = this.appSettings.settings;
  }

  title = 'app';
}
