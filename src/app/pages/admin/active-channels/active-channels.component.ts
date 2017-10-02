import { Component, OnInit, OnDestroy, HostListener, ViewChild, ElementRef }          from '@angular/core';
import { Router, ActivatedRoute, NavigationStart, NavigationEnd } from '@angular/router';

import { ChannelRequest }         from '../channel/channel.request';
import { Channel }                from '../../../core/models/channel.model';

@Component({
  templateUrl: './active-channels.component.jade'
})

export class ActiveChannelsComponent implements OnInit, OnDestroy {
  private contentLoaded: boolean = false;
  private channelsLoaded: boolean = false;
  private sidebarMenuToggle: boolean = false;
  private accountMenuToggle: boolean = false;

  private channels: Channel[] = [];
  private listedChannel: {[key: number]: boolean} = {};
  private openedChannel: number = -1;

  private routeSubscr: any;
  private routeEventsSubscr: any;

  @ViewChild('addMenu') addMenuInView: ElementRef;
  @ViewChild('accountMenu') accountMenuInView: ElementRef;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private channelRequest: ChannelRequest ) {
    this.setChannels = this.setChannels.bind(this);
  }

  @HostListener('document:click', ['$event.target'])
  clickHandle( event: any ) {
    let clickedInsideAddMenu = this.addMenuInView.nativeElement.contains(event);
    let clickedInsideAccountMenu = this.accountMenuInView.nativeElement.contains(event);
    if ( !clickedInsideAddMenu ) {
      this.sidebarMenuToggle = false;
    }
    if ( !clickedInsideAccountMenu ) {
      this.accountMenuToggle = false;
    }
  }

  ngOnInit() {
    this.routeSubscr = this.route.data.subscribe((data: any) => this.setChannels(data.channels) );
    this.routeEventsSubscr = this.router.events.subscribe((event: NavigationStart) => {
      if ( (event instanceof NavigationStart) ) {
        this.contentLoaded = false;
      }
      if ( (event instanceof NavigationEnd) ) {
        this.contentLoaded = true;
        if (~event.urlAfterRedirects.indexOf('/all-channels') ) {
          this.openedChannel = -1;

        } else if (~event.urlAfterRedirects.indexOf('/channel/')) {

          let urtParts: string[] = event.urlAfterRedirects.split('/');
          let channelId: number = -1;

          if (urtParts.length > 5 && typeof urtParts[4] === 'number') {
            channelId = +urtParts[4];
          }
          this.openedChannel = channelId;
        }
      }
    });
  }

  private setChannels(channels: Channel[]): void {
    this.channels = channels ? channels : [];
    this.channelsLoaded = true;
  }

  private toggleChannel(i: number): void {
    this.listedChannel[i] = !this.listedChannel[i];
  }

  private showChannel(channel: Channel, event: any): void {
    if ( event.target.classList && event.target.classList.contains('toggle') ) return;
    this.openedChannel = channel.id;
    this.router.navigate([`/admin/active/channel/${channel.id}`]);
  }

  private logout(): void {
  }

  ngOnDestroy() {
    this.routeSubscr.unsubscribe();
  }
}
