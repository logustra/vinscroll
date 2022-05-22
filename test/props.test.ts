import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Vinscroll from '../src'

describe('props', () => {
  describe('element', () => {
    it('should be rendered properly', () => {
      const wrapper = mount(Vinscroll)

      expect(wrapper.vm.$el.tagName.toLowerCase()).toBe('div')
    })
  })
})
