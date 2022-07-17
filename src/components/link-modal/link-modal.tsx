import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';

export interface VisibleInfo {
  group: string;
  id?: number;
  name?: string;
  url?: string;
}

@Component({
  tag: 'link-modal',
  styleUrl: 'link-modal.css',
  shadow: true,
})
export class LinkModal {
  @Prop({ mutable: true }) visible: VisibleInfo;

  @Event() closeLinkModal: EventEmitter;
  @Event() saveLinkModal: EventEmitter;

  closeModal = () => {
    this.visible = undefined;
    this.closeLinkModal.emit();
  };

  handleChangeName(event) {
    if (!this.visible) {
      console.log('empty object');
    }
    this.visible = { ...this.visible, name: event.target.value };
  }

  handleChangeUrl(event) {
    if (!this.visible) {
      console.log('empty object');
    }
    this.visible = { ...this.visible, url: event.target.value };
  }

  saveModal = () => {
    if (this.visible?.name?.length > 0 && this.visible?.url?.length > 0) {
      this.saveLinkModal.emit(this.visible);
    }
  };

  render() {
    return (
      <Host>
        <div class={this.visible ? 'container visible' : 'container'}>
          <div class="background" onClick={this.closeModal}></div>
          <div class="modal">
            Add to {this.visible?.group?.toUpperCase()}:
            <input type="text" placeholder="Name" value={this.visible?.name} onInput={e => this.handleChangeName(e)} />
            <input type="text" placeholder="URL" value={this.visible?.url} onInput={e => this.handleChangeUrl(e)} />
            <div class="buttons">
              <button class="grey" onClick={this.closeModal}>
                Cancel
              </button>
              <button class={this.visible?.name?.length > 0 && this.visible?.url?.length > 0 ? 'blue' : 'grey'} onClick={this.saveModal}>
                Save
              </button>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
