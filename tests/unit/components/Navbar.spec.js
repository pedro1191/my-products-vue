import { createStore } from 'vuex';
import { faker } from '@faker-js/faker';
import { mount } from '@vue/test-utils';
import { RouterLinkStub } from '@vue/test-utils';
import Navbar from '@/components/Navbar.vue';

const createVuexStore = (screenWidth = 768, categories = []) => {
  return createStore({
    state() {
      return {
        categories,
        screenWidth,
      };
    },
    getters: {
      isASmallDevice(state) {
        return state.screenWidth < 768;
      },
      categories(state) {
        return state.categories;
      },
    },
  });
};

describe('Navbar.vue', () => {
  it('renders the nav links for big devices', () => {
    // ARRANGE
    const store = createVuexStore();
    const expectedLinks = ['FoodClub', 'Home', 'About', 'Contact', 'Dashboard'];
    const wrapper = mount(Navbar, {
      global: {
        mocks: {
          $route: {
            name: faker.lorem.word(),
          },
        },
        plugins: [store],
        stubs: {
          FontAwesomeIcon: true,
          RouterLink: RouterLinkStub,
        },
      },
    });

    // ACT
    const anchors = wrapper.findAll('.nav-item');
    const logoLink = wrapper.get('.navbar-brand');
    anchors.unshift(logoLink);

    // ASSERT
    expect(anchors.length).toBe(expectedLinks.length);
    anchors.forEach((anchor, index) => {
      expect(anchor.text()).toBe(expectedLinks[index]);
    });
  });

  it('renders the nav links for small devices', () => {
    // ARRANGE
    const expectedCategories = [
      {
        id: faker.datatype.number(),
        name: faker.lorem.words(),
      },
      {
        id: faker.datatype.number(),
        name: faker.lorem.words(),
      },
    ];
    const store = createVuexStore(
      faker.datatype.number({ max: 767 }),
      expectedCategories
    );
    const expectedLinks = [
      'FoodClub',
      'Home',
      'About',
      'Categories',
      'Contact',
      'Dashboard',
    ];
    const wrapper = mount(Navbar, {
      global: {
        mocks: {
          $route: {
            name: faker.lorem.word(),
          },
        },
        plugins: [store],
        stubs: {
          FontAwesomeIcon: true,
          RouterLink: RouterLinkStub,
        },
      },
    });

    // ACT
    const anchors = wrapper.findAll('.nav-item');
    const logoLink = wrapper.get('.navbar-brand');
    anchors.unshift(logoLink);
    const categories = wrapper.get('.dropdown-menu').findAll('.dropdown-item');

    // ASSERT
    expect(anchors.length).toBe(expectedLinks.length);
    anchors.forEach((anchor, index) => {
      expect(anchor.text()).toContain(expectedLinks[index]);
    });
    expect(categories.length).toBe(expectedCategories.length);
    categories.forEach((category, index) => {
      expect(category.text()).toBe(expectedCategories[index].name);
    });
  });
});
