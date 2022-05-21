<script lang="ts">
import {
  computed,
  defineComponent,
  h,
  onMounted,
  onUnmounted,
  toRefs,
} from 'vue-demi'

export default defineComponent({
  name: 'Vinscroll',
  props: {
    tag: {
      type: String,
      required: false,
      default: 'div',
    },
    isElement: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup(props, { emit, slots }) {
    const {
      tag,
      isElement,
    } = toRefs(props)

    /**
     * DESC:
     * event listener
     */
    const LOAD_MORE = 'load:more'

    const element = computed(() => {
      let result = document.documentElement

      /**
       * DESC:
       * use this element when the infinite scoll
       * is in the element
       */
      if (isElement.value)
        result = (slots.default && slots.default()[0].el) as HTMLElement

      return result
    })

    function onScroll() {
      if (element.value && element.value.scrollTop > 0) {
        /**
         * DESC:
         * calculations for how much the document
         * has been scrolled from the top
         */
        const scrollY = (
          isElement.value
            ? element.value.scrollTop + element.value.clientHeight
            : window.pageYOffset + window.innerHeight
        )

        /**
         * DESC:
         * calculation for mobile
         */
        const downwardScrollY = Math.floor(scrollY)

        /**
         * DESC:
         * calculation for desktop
         */
        const upwardScrollY = Math.ceil(scrollY)

        /**
         * DESC:
         * height of an element's content
         * including content not visible on the screen due to overflow
         */
        const scrollHeight = element.value.scrollHeight

        /**
         * DESC:
         * set to true when the scroll has arrived at the bottom,
         * both on desktop or mobile.
         */
        const isArrivedBottom = downwardScrollY === scrollHeight || upwardScrollY === scrollHeight

        /**
         * DESC:
         * fires immediately when the user scroll has arrived at the bottom
         */
        if (isArrivedBottom) emit(LOAD_MORE)
      }
    }

    onMounted(() => {
      if (isElement.value)
        element.value && element.value.addEventListener('scroll', onScroll)

      else
        window.addEventListener('scroll', onScroll)
    })

    onUnmounted(() => {
      /**
       * DESC:
       * remove event listener to free up memory usage
       */
      if (isElement.value)
        element.value && element.value.removeEventListener('scroll', onScroll)

      else
        window.removeEventListener('scroll', onScroll)
    })

    /**
     * DESC:
     * passing html tag as string
     * passing props as null
     */
    return () => h(
      tag.value,
      null,
      slots.default && slots.default(),
    )
  },
})
</script>
