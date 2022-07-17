import { newE2EPage } from '@stencil/core/testing';

describe('link-modal', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<link-modal></link-modal>');

    const element = await page.find('link-modal');
    expect(element).toHaveClass('hydrated');
  });
});
