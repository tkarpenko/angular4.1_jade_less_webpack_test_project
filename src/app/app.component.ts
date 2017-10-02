import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'body[app]',
  templateUrl: './app.component.jade',
  styles : [require('./app.component.less')],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent {
  constructor() {}
}
