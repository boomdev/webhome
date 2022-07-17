import { newE2EPage } from '@stencil/core/testing';

describe('link-box', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<link-box></link-box>');

    const element = await page.find('link-box');
    expect(element).toHaveClass('hydrated');
  });
});
