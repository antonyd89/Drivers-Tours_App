import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from './index.vue'
import type { ModeType } from './index.vue'

const slots = {
  default: 'Title of button',
}

const props: {
  mode: ModeType;
  disabled: boolean;
  icon: boolean;
} = {
  mode: 'success',
  disabled: false,
  icon: false,
}

describe('Button', () => {
  it('slot renders default slot content', async () => {
    const wrapper = mount(Button, { slots })
    const heading = wrapper.find('.btn');

    expect(heading.exists()).toBe(true);
    expect(heading.text()).toBe('Title of button');
  })

  it('applies mode class based on prop mode', () => {
    const wrapper = mount(Button, {
      props,
    });
    expect(wrapper.classes()).toContain('btn--success');
  });

  it('applies disabled class and attribute when disabled', () => {
    props.disabled = true;

    const wrapper = mount(Button, {
      props,
    });
    expect(wrapper.classes()).toContain('btn--disabled');
    expect(wrapper.find('.btn').attributes('disabled')).toBe('');
  });

  it('applies icon class when icon is true', () => {
    props.icon = true;
    const wrapper = mount(Button, {
      props,
    });
    expect(wrapper.classes()).toContain('btn--icon');
  });

  it('emits click event when clicked and not disabled', async () => {
    const wrapper = mount(Button);
    await wrapper.find('.btn').trigger('click');
    expect(wrapper.emitted('click')).toHaveLength(1);
  });

  it('does not emit click event when disabled', async () => {
    props.disabled = true;
    const wrapper = mount(Button, {
      props,
    });
    await wrapper.find('.btn').trigger('click');
    expect(wrapper.emitted('click')).toBeUndefined();
  });
})
