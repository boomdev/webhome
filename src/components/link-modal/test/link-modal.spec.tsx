import { newSpecPage } from '@stencil/core/testing';
import { LinkModal } from '../link-modal';

describe('link-modal', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [LinkModal],
      html: `<link-modal></link-modal>`,
    });
    expect(page.root).toEqualHtml(`
      <link-modal>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </link-modal>
    `);
  });
});
