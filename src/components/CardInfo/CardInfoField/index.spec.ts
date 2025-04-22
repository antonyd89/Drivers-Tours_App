import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CardInfoField from './index.vue'

const props = {
  term: 'Term',
  definition: 'Definition',
}

describe('CardInfoField', () => {
  it('term property renders properly', () => {
    const wrapper = mount(CardInfoField, { props })
    expect(wrapper.text()).toContain(props.term)
  })

  it('definition property renders properly', () => {
    const wrapper = mount(CardInfoField, { props })
    expect(wrapper.text()).toContain(props.definition)
  })

  it('if definition property is empty render "n/a" instead', () => {
    props.definition = ''
    const wrapper = mount(CardInfoField, { props })
    expect(wrapper.text()).toContain('n/a')
  })
})
