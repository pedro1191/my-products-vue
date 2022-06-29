import { mount } from '@vue/test-utils';
import Footer from '@/components/Footer.vue';

describe('Footer.vue', () => {
  it('renders the current year', () => {
    // ARRANGE
    const thisYear = new Date().getFullYear().toString();
    const wrapper = mount(Footer, {
      global: {
        stubs: ['FontAwesomeIcon'],
      },
    });

    // ACT
    const wrapperText = wrapper.text();

    // ASSERT
    expect(wrapperText).toContain(thisYear);
  });
});
