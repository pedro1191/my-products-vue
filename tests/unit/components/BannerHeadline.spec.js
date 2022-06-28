import { mount } from '@vue/test-utils';
import { RouterLinkStub } from '@vue/test-utils';
import BannerHeadline from '@/components/BannerHeadline.vue';

describe('BannerHeadline.vue', () => {
  it('renders properly', () => {
    // ARRANGE
    const wrapper = mount(BannerHeadline, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });

    // ACT
    const header = wrapper.get('h1');
    const actionLink = wrapper.getComponent(RouterLinkStub);

    // ASSERT
    expect(header.text()).toBe("FIND HERE WHAT'S THE BEST IN THE CUISINE!");
    expect(actionLink.props().to).toBe('/about');
  });
});
