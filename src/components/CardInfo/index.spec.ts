import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import CardInfo from './index.vue'

const slots = {
  heading: '<div class="heading-slot">Heading</div>',
  default: '<div class="default-slot">Some content goes here ...</div>',
}

describe('CardInfo', () => {
  it('slot renders heading slot content', async () => {
    const wrapper = mount(CardInfo, { slots })
    const heading = wrapper.find('.heading-slot');

    expect(heading.exists()).toBe(true);
    expect(heading.text()).toBe('Heading');
  })

  it('slot renders default slot content', async () => {
    const wrapper = mount(CardInfo, { slots })
    const defaultSlot = wrapper.find('.default-slot');

    expect(defaultSlot.exists()).toBe(true);
    expect(defaultSlot.text()).toBe('Some content goes here ...');
  })

  it('deleteCard method triggers when delete button is clicked', async () => {
    const deleteCard = vi.fn();
    const editCard = vi.fn();

    const wrapper = mount(CardInfo, {
      global: {
        mocks: {
          deleteCard,
          editCard,
        },
      },
      slots,
    });

    const deleteButton = wrapper.find('.card-info__delete-button');
    await deleteButton.trigger('click');

    expect(deleteCard).toHaveBeenCalled();
  })

  it('editCard method triggers when edit button is clicked', async () => {
    const deleteCard = vi.fn();
    const editCard = vi.fn();

    const wrapper = mount(CardInfo, {
      global: {
        mocks: {
          deleteCard,
          editCard,
        },
      },
      slots,
    });

    const editButton = wrapper.find('.card-info__edit-button');
    await editButton.trigger('click');

    expect(editCard).toHaveBeenCalled();
  })
})
