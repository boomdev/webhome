import { newSpecPage } from '@stencil/core/testing';
import { LinkBox } from '../link-box';

describe('link-box', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [LinkBox],
      html: `<link-box></link-box>`,
    });
    expect(page.root).toEqualHtml(`
      <link-box>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </link-box>
    `);
  });
});
