import { faker } from '@faker-js/faker';
import { mount } from '@vue/test-utils';
import { RouterLinkStub } from '@vue/test-utils';
import Cards from '@/components/Product/Cards.vue';

describe('Cards.vue', () => {
  it('renders the feedback message when props.products is empty', () => {
    // ARRANGE
    const products = [];
    const wrapper = mount(Cards, {
      props: { products },
    });

    // ACT
    const wrapperText = wrapper.text();

    // ASSERT
    expect(wrapperText).toContain('No results found =/');
  });

  it('renders the props.products when passed', () => {
    // ARRANGE
    const numberOfItems = faker.datatype.number({ min: 1, max: 5 });
    const products = [];
    for (let i = 0; i < numberOfItems; i++) {
      products.push({
        id: faker.datatype.number(),
        name: faker.lorem.words(),
        description: faker.lorem.sentence(),
        image: faker.image.dataUri(),
        category: {
          data: { name: faker.name.findName() },
        },
      });
    }
    const wrapper = mount(Cards, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
      props: { products },
    });

    // ACT
    const cards = wrapper.findAll('.card');

    // ASSERT
    expect(cards.length).toBe(products.length);
    cards.forEach((card, index) => {
      expect(card.text()).toContain(products[index].name);
      expect(card.text()).toContain(products[index].category.data.name);
      expect(card.get('img').attributes('src')).toBe(products[index].image);
    });
  });
});
