import { newE2EPage } from '@stencil/core/testing';

describe('link-group', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<link-group></link-group>');

    const element = await page.find('link-group');
    expect(element).toHaveClass('hydrated');
  });
});
