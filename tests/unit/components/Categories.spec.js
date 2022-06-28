import { faker } from '@faker-js/faker';
import { mount } from '@vue/test-utils';
import { RouterLinkStub } from '@vue/test-utils';
import Categories from '@/components/Categories.vue';

describe('Categories.vue', () => {
  it('renders the props.title when passed', () => {
    // ARRANGE
    const categories = [];
    const title = faker.lorem.words();
    const wrapper = mount(Categories, {
      global: {
        stubs: ['FontAwesomeIcon', 'RouterLink'],
      },
      props: {
        categories,
        title,
      },
    });

    // ACT
    const titleWrapper = wrapper.get('.title');

    // ASSERT
    expect(titleWrapper.text()).toBe(title);
  });

  it('renders the feedback message when props.categories is empty', () => {
    // ARRANGE
    const categories = [];
    const wrapper = mount(Categories, {
      global: {
        stubs: ['FontAwesomeIcon', 'RouterLink'],
      },
      props: { categories },
    });

    // ACT
    const wrapperText = wrapper.text();

    // ASSERT
    expect(wrapperText).toContain('No categories found =/');
  });

  it('renders the props.categories when passed', () => {
    // ARRANGE
    const numberOfItems = faker.datatype.number({ min: 1, max: 5 });
    const categories = [];
    for (let i = 0; i < numberOfItems; i++) {
      categories.push({
        id: faker.datatype.number(),
        name: faker.name.findName(),
      });
    }
    const wrapper = mount(Categories, {
      global: {
        mocks: {
          $route: {
            query: {},
          },
        },
        stubs: {
          FontAwesomeIcon: true,
          RouterLink: RouterLinkStub,
        },
      },
      props: { categories },
    });

    // ACT
    const categoryLinks = wrapper.findAll('.list-group-item');

    // ASSERT
    expect(categoryLinks.length).toBe(categories.length);
    categoryLinks.forEach((categoryLink, index) => {
      expect(categoryLink.text()).toBe(categories[index].name);
    });
  });
});
