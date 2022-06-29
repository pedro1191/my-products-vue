import {
  faFacebookF,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { mount } from '@vue/test-utils';
import SocialMedia from '@/components/SocialMedia.vue';

library.add(faFacebookF, faInstagram, faTwitter);

describe('SocialMedia.vue', () => {
  it('renders properly', () => {
    // ARRANGE
    const iconClasses = [
      'fa-brands fa-facebook-f',
      'fa-brands fa-instagram',
      'fa-brands fa-twitter',
    ];
    const wrapper = mount(SocialMedia, {
      global: {
        stubs: { FontAwesomeIcon },
      },
    });

    // ACT
    const anchors = wrapper.findAll('a');

    // ASSERT
    expect(iconClasses.length).toBe(anchors.length);
    anchors.forEach((anchor, index) => {
      const icon = anchor.find('svg');
      const expectedIconClasses = `${iconClasses[index].replace(
        'fa-brands',
        ''
      )}`;
      expect(icon.attributes('class')).toContain(expectedIconClasses);
    });
  });
});
