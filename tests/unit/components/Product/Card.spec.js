import { faker } from '@faker-js/faker';
import { mount } from '@vue/test-utils';
import { RouterLinkStub } from '@vue/test-utils';
import Card from '@/components/Product/Card.vue';

describe('Card.vue', () => {
  it('renders the props.product when passed', () => {
    // ARRANGE
    const product = {
      id: faker.datatype.number(),
      name: faker.lorem.words(),
      description: faker.lorem.sentence(),
      image: faker.image.dataUri(),
      category: {
        data: { name: faker.name.findName() },
      },
    };
    const wrapper = mount(Card, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
      props: { product },
    });

    // ACT
    const productLink = wrapper.getComponent(RouterLinkStub);

    // ASSERT
    expect(productLink.text()).toBe(product.name);
    expect(productLink.props().to).toEqual({
      name: 'productsSingle',
      params: { id: product.id },
    });
    expect(wrapper.text()).toContain(product.category.data.name);
    expect(wrapper.get('img').attributes('src')).toBe(product.image);
  });
});
