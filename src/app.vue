<template>
  <div>
    <Vinscroll
      :element="elScroll"
      @load:more="onLoadMore"
    >
      <div
        ref="elScroll"
        style="height: 200px; border: 1px solid black; overflow: auto;"
      >
        <div
          v-for="item in items"
          :key="item"
          style="padding: 5px; margin: 5px; background-color: green;"
        >
          {{ item }}
        </div>

        <div
          v-if="isLoading"
          style="text-align: center;"
        >
          loading...
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

      <div
        v-if="isLoading"
        style="text-align: center;"
      >
        loading...
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
    const elScroll = ref(null)
    const isLoading = ref(false)
    const items = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

    function timeout(milliseconds: number) {
      return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    async function onLoadMore() {
      isLoading.value = true
      await timeout(1000)
      isLoading.value = false

      const length = items.value.length + 1
      items.value.push(...Array.from({ length: 5 }, (_, index) => length + index))
    }

    return {
      elScroll,
      isLoading,
      items,
      onLoadMore,
    }
  },
})
</script>
