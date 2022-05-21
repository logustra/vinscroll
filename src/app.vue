<template>
  <div>
    <Vinscroll
      is-element
      @load:more="onLoadMore"
    >
      <div style="height: 200px; border: 1px solid black; overflow: auto;">
        <div
          v-for="item in items"
          :key="item"
          style="padding: 5px; margin: 5px; background-color: green;"
        >
          {{ item }}
        </div>
      </div>
    </Vinscroll>

    <Vinscroll
      @load:more="onLoadMore"
    >
      <div
        v-for="item in items"
        :key="item"
        style="padding: 5px; margin: 5px; background-color: green;"
      >
        {{ item }}
      </div>
    </Vinscroll>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
} from 'vue'
import Vinscroll from './vinscroll.vue'

export default defineComponent({
  name: 'App',
  components: {
    Vinscroll,
  },
  setup() {
    const items = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

    function onLoadMore() {
      const length = items.value.length + 1
      items.value.push(...Array.from({ length: 5 }, (_, index) => length + index))
    }

    return {
      items,
      onLoadMore,
    }
  },
})
</script>
