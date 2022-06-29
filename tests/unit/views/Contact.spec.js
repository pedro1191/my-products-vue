import { createStore } from 'vuex';
import { faker } from '@faker-js/faker';
import { flushPromises, mount } from '@vue/test-utils';
import axios from '@/axios-default';
import Contact from '@/views/Contact';

const createVuexStore = () => {
  return createStore({
    state() {
      return {
        thingsLoading: 0,
      };
    },
    mutations: {
      setLoading(state, isLoading) {
        isLoading ? state.thingsLoading++ : state.thingsLoading--;
      },
    },
    actions: {
      setLoading({ commit }) {
        commit('setLoading');
      },
    },
  });
};

describe('Contact.vue', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders properly', () => {
    // ARRANGE
    const wrapper = mount(Contact);

    // ACT
    const headerTitle = wrapper.get('h1');
    const contactForm = wrapper.find('form');

    // ASSERT
    expect(headerTitle.text()).toBe('Contact Us');
    expect(contactForm.exists()).toBe(true);
  });

  it('sends the contact message properly', async () => {
    // ARRANGE
    const mockFeedbackMessage = {
      data: { message: faker.lorem.sentence() },
    };
    jest.spyOn(axios, 'post').mockResolvedValue(mockFeedbackMessage);
    const store = createVuexStore();
    const wrapper = mount(Contact, {
      global: {
        plugins: [store],
      },
    });

    // ACT
    const form = wrapper.get('form');
    const nameInput = form.get('[id="name"');
    const emailInput = form.get('[id="email"');
    const messageInput = form.get('[id="message"');
    const nameValue = faker.name.findName();
    const emailValue = faker.internet.email();
    const messageValue = faker.lorem.paragraphs();
    const messageData = {
      email: emailValue,
      message: messageValue,
      name: nameValue,
    };
    await nameInput.setValue(nameValue);
    await emailInput.setValue(emailValue);
    await messageInput.setValue(messageValue);
    await form.get('button').trigger('click');
    await flushPromises();

    // ASSERT
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith('/contacts', messageData);
  });
});
