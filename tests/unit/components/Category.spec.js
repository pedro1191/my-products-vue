import { faker } from '@faker-js/faker';
import { mount } from '@vue/test-utils';
import { RouterLinkStub } from '@vue/test-utils';
import Category from '@/components/Category.vue';

describe('Category.vue', () => {
  it('renders the props when passed', () => {
    // ARRANGE
    const category = {
      id: faker.datatype.number(),
      name: faker.name.findName(),
    };
    const customClasses = faker.lorem.words();
    const wrapper = mount(Category, {
      global: {
        mocks: {
          $route: {
            query: {},
          },
        },
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
      props: {
        category,
        customClasses,
      },
    });

    // ACT
    const categoryLink = wrapper.getComponent(RouterLinkStub);

    // ASSERT
    expect(categoryLink.text()).toBe(category.name);
    expect(categoryLink.attributes('class')).toBe(customClasses);
    expect(categoryLink.props().to).toEqual({
      name: 'products',
      query: { category: category.id },
    });
  });
});
