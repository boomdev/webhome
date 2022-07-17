import { Component, Event, EventEmitter, h, Host, Listen, Prop, State } from '@stencil/core';
import { LinkInfo } from '../link-box/link-box';
import { VisibleInfo } from '../link-modal/link-modal';

export interface GroupInfo {
  id: number;
  name: string;
  links: LinkInfo[];
}

@Component({
  tag: 'link-group',
  styleUrl: 'link-group.css',
  shadow: true,
})
export class LinkGroup {
  @Prop({ mutable: true }) group: GroupInfo;

  // @Watch('group')
  // watchPropHandler(newValue: GroupInfo) {
  //   console.log('The new value of activated is: ', newValue);
  //   if (newValue) {
  //     // this.group = {
  //     //   ...this.group,
  //     //   links: [
  //     //     ...this.group.links,
  //     //     {
  //     //       name: 'NEW',
  //     //       url: '',
  //     //     },
  //     //   ],
  //     // };
  //   }
  // }

  @State() showLinkModal = null;
  @Event() updateGroup: EventEmitter;

  addLink = () => {
    this.showLinkModal = { group: this.group.name };
  };

  @Listen('editLinkEvent')
  editLinkEventHandeler(event: CustomEvent<LinkInfo>) {
    this.showLinkModal = {
      group: this.group.name,
      name: event.detail.name,
      url: event.detail.url,
      id: event.detail.id,
    };
  }

  @Listen('closeLinkModal')
  closeLinkModalHandler() {
    this.showLinkModal = null;
  }

  @Listen('saveLinkModal')
  saveLinkModalHandler(event: CustomEvent<VisibleInfo>) {
    this.showLinkModal = null;

    const links = this.group.links
      .filter(l => l.id !== event.detail.id)
      .concat({
        id: event.detail.id ? event.detail.id : this.group.links.length,
        name: event.detail.name,
        url: event.detail.url,
      })
      .sort((a, b) => a.id - b.id);

    this.group = {
      ...this.group,
      links,
    };

    this.updateGroup.emit(this.group);
  }

  render() {
    return (
      <Host>
        <link-modal visible={this.showLinkModal}></link-modal>
        <div class="group-name">{this.group.name}</div>
        <div class="add-link" onClick={this.addLink}>
          +
        </div>
        <div class="group">
          {this.group?.links.map(l => (
            <link-box link={l}></link-box>
          ))}
        </div>
      </Host>
    );
  }
}
