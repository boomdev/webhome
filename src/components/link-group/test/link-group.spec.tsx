import { newSpecPage } from '@stencil/core/testing';
import { LinkGroup } from '../link-group';

describe('link-group', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [LinkGroup],
      html: `<link-group></link-group>`,
    });
    expect(page.root).toEqualHtml(`
      <link-group>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </link-group>
    `);
  });
});
