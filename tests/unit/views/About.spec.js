import { mount } from '@vue/test-utils';
import About from '@/views/About.vue';

describe('About.vue', () => {
  it('renders properly', () => {
    // ARRANGE
    const wrapper = mount(About, {
      global: {
        stubs: ['FontAwesomeIcon'],
      },
    });

    // ACT
    const header = wrapper.get('h1');

    // ASSERT
    expect(header.text()).toBe('FoodClub');
  });
});
