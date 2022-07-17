import { Component, h, Listen, State } from '@stencil/core';
import { GroupInfo } from '../link-group/link-group';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true,
})
export class AppRoot {
  @State() data: GroupInfo[];

  componentWillLoad() {
    const data = localStorage.getItem('data');
    if (data && data.length > 0) {
      this.data = JSON.parse(data);
    } else {
      this.data = [
        {
          id: 0,
          name: 'GRP',
          links: [],
        },
      ];
    }
  }

  @Listen('updateGroup')
  updateGroupHandler(event: CustomEvent<GroupInfo>) {
    this.data = this.data
      .filter(g => g.id !== event.detail.id)
      .concat(event.detail)
      .sort((a, b) => a.id - b.id);
    localStorage.setItem('data', JSON.stringify(this.data));
  }

  render() {
    return (
      <div>
        <header>
          <h1>Web Home</h1>
        </header>

        <main>
          {this.data.map(g => (
            <link-group group={g}></link-group>
          ))}
        </main>
      </div>
    );
  }
}
