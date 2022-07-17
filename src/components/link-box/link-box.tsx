import { Component, Host, h, Prop, EventEmitter, Event } from '@stencil/core';

export interface LinkInfo {
  id: number;
  name: string;
  url: string;
}

@Component({
  tag: 'link-box',
  styleUrl: 'link-box.css',
  shadow: true,
})
export class LinkBox {
  @Prop() link: LinkInfo;

  @Event() editLinkEvent: EventEmitter;

  onEditLink() {
    this.editLinkEvent.emit(this.link);
  }

  getFacionUrl() {
    const url = new URL(this.link.url);
    return url.protocol + url.hostname + '/favicon.ico';
  }

  render() {
    return (
      <Host>
        <div class="box">
          <a class="icon" href={this.link.url} target="_blank">
            <img src={this.getFacionUrl()} alt={this.link.name.charAt(0).toUpperCase()} />
          </a>
          <div class="name" onClick={() => this.onEditLink()}>
            {this.link.name}
          </div>
        </div>
      </Host>
    );
  }
}
