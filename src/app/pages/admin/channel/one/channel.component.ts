import { Component, OnInit, OnDestroy }      from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Channel }        from '../../../../core/models/channel.model';

@Component({
  templateUrl: './channel.component.jade'
})

export class ChannelComponent implements OnInit, OnDestroy {

  private channel: Channel;
  private routeSubscr: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.routeSubscr = this.route.data.subscribe((data: any) => this.channel = data.channel);
  }

  ngOnDestroy() {
    this.routeSubscr.unsubscribe();
  }
}
