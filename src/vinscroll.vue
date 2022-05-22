<script lang="ts">
import type { PropType } from 'vue-demi'
import {
  computed,
  defineComponent,
  h,
  onMounted,
  onUnmounted,
  toRefs,
  watch,
} from 'vue-demi'

export default defineComponent({
  name: 'Vinscroll',
  props: {
    element: {
      type: HTMLElement as PropType<HTMLElement | null>,
      required: false,
      default: null,
    },
  },
  setup(props, { emit, slots }) {
    const { element } = toRefs(props)

    /**
     * DESC:
     * event listener
     */
    const LOAD_MORE = 'load:more'

    const currentElement = computed(() => {
      /**
       * DESC:
       * use this element when the infinite scoll
       * is in the element
       */
      return (
        element.value
          ? element.value
          : document.documentElement
      )
    })

    function onScroll() {
      if (
        currentElement.value
        && currentElement.value.scrollTop > 0
      ) {
        /**
         * DESC:
         * calculations for how much the document
         * has been scrolled from the top
         */
        const scrollY = (
          element.value
            ? currentElement.value.scrollTop + currentElement.value.clientHeight
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
        const scrollHeight = currentElement.value.scrollHeight

        /**
         * DESC:
         * set to true when the scroll has arrived at the bottom,
         * both on desktop or mobile.
         */
        const isArrivedBottom = (
          downwardScrollY === scrollHeight
          || upwardScrollY === scrollHeight
        )

        /**
         * DESC:
         * fires immediately when the user scroll has arrived at the bottom
         */
        if (isArrivedBottom) emit(LOAD_MORE)
      }
    }

    watch(
      () => currentElement.value,
      () => {
        if (currentElement.value) {
          currentElement.value.removeEventListener('scroll', onScroll)
          currentElement.value.addEventListener('scroll', onScroll)
        }
        else {
          window.removeEventListener('scroll', onScroll)
          window.addEventListener('scroll', onScroll)
        }
      },
    )

    onMounted(() => {
      if (!element.value)
        window.addEventListener('scroll', onScroll)
    })

    onUnmounted(() => {
      /**
       * DESC:
       * remove event listener to free up memory usage
       */
      if (element.value)
        currentElement.value.removeEventListener('scroll', onScroll)

      else
        window.removeEventListener('scroll', onScroll)
    })

    /**
     * DESC:
     * passing html tag as string
     * passing props as null
     */
    return () => h(
      'div',
      null,
      slots.default && slots.default(),
    )
  },
})
</script>
