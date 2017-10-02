import { Component, OnInit }             from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ChannelRequest }    from '../channel.request';
import { Channel }           from '../../../../core/models/channel.model';

@Component({
  templateUrl: './channel-desc.component.jade'
})

export class ChannelDescriptionComponent implements OnInit {

  private isEditable: boolean = false;
  private anyChanges: boolean = false;
  private channel: Channel;
  private submitting: boolean = false;
  private routeSubscr: any;
  private form: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private channelRequest: ChannelRequest
  ) {
  }

  ngOnInit() {
    this.isEditable = this.route.parent.parent.snapshot.url[0].path === 'active';
    this.routeSubscr = this.route.parent.data.subscribe((data: any) => {
      this.channel = data.channel;
      this.form = this.formBuilder.group({
        channelName: [this.channel.name, Validators.compose([
          Validators.required
         ])]
      });
    });
  }

  private submit() {
    if ( this.submitting ) return;

    this.submitting = true;
  }

  ngOnDestroy() {
    this.routeSubscr.unsubscribe();
  }
}
