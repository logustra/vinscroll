## Vinscroll

[![Codecov](https://img.shields.io/codecov/c/github/logustra/vinscroll)](https://codecov.io/github/logustra/vinscroll?branch=master)
[![Downloads](https://img.shields.io/npm/dm/@logustra/vinscroll)](https://npmcharts.com/compare/@logustra/vinscroll?minimal=true)
[![Version](https://img.shields.io/npm/v/@logustra/vinscroll)](https://www.npmjs.com/package/@logustra/vinscroll)
[![Gzip Size](https://img.badgesize.io/https://unpkg.com/@logustra/vinscroll/dist/index.umd.js?compression=gzip)](https://unpkg.com/@logustra/vinscroll/dist/index.umd.js)
[![License](https://img.shields.io/github/license/logustra/vinscroll)](https://github.com/logustra/vinscroll/blob/master/license.md)
[![Code Style](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Commitizen](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli)

> A minimalist infinite scroll component for vue 2-3

## Getting Started
### NPM

```shell
npm install @logustra/vinscroll
```

To make `@logustra/vinscroll` work for Vue 2, you need to have `@vue/composition-api` installed.

```shell
npm install @vue/composition-api
```

### CDN
Drop `<script>` inside your HTML file.

Vue 3
```html
<script src="https://cdn.jsdelivr.net/npm/vue@3.2.31"></script>
<script src="https://cdn.jsdelivr.net/npm/@logustra/vinscroll"></script>
```

Vue 2
```html
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.14"></script>
<script src="https://cdn.jsdelivr.net/npm/@vue/composition-api@1.4.9"></script>
<script src="https://cdn.jsdelivr.net/npm/@logustra/vinscroll"></script>
```

## Usage
### Setup
Vue 3
```js
import { createApp } from 'vue'
import Vinscroll from '@logustra/vinscroll'
import App from './app.vue'

const app = createApp(App)
app.use(Vinscroll)
```

Vue 2
```js
import Vue from 'vue'
import CompositionAPI from '@vue/composition-api'
import Vinscroll from '@logustra/vinscroll'

Vue.use(CompositionAPI)
Vue.use(Vinscroll)
```

### Basic Usage
```html
<template>
  <vinscroll
    @load:more="onLoadMore"
  >
    <div
      v-for="item in items"
      :key="item"
    >
      {{ item }}
    </div>
  </vinscroll>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    const items = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

    function onLoadMore() {
      const length = items.value.length + 1
      items.value.push(...Array.from({ length: 5 }, (_, index) => length + index))
    }

    return { 
      items,
      onLoadMore 
    }
  },
}
</script>
```
[Demo →](https://stackblitz.com/edit/vitejs-vite-x1g4ac?file=src%2Fcomponents%2FbasicUsage.vue)

### In Element
```html
<template>
  <Vinscroll
    :element="elScroll"
    @load:more="onLoadMore"
  >
    <div
      ref="elScroll"
      style="height: 200px; overflow: auto;"
    >
      <div
        v-for="item in items"
        :key="item"
      >
        {{ item }}
      </div>
    </div>
  </Vinscroll>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    const elScroll = ref(null)
    const items = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

    function onLoadMore() {
      const length = items.value.length + 1
      items.value.push(...Array.from({ length: 5 }, (_, index) => length + index))
    }

    return {
      elScroll,
      items,
      onLoadMore,
    }
  },
}
</script>
```
[Demo →](https://stackblitz.com/edit/vitejs-vite-x1g4ac?file=src%2Fcomponents%2FinElement.vue)

## API
### Props
| Name | Type | Default | Description |
|------|------|---------|-------------|
| element | `HTMLElement` | `null` | The HTML of the scrollable element | 

### Events
| Name | Listen to | Description |
|------|-----------|-------------|
| load:more | `@load:more` | Emitted after the scroll has arrived at the bottom | 

## Cheer me on
If you like my works, you can cheer me on here 😆

&nbsp; &nbsp; 🇮🇩 [Trakteer](https://trakteer.id/logustra/tip)<br>
&nbsp; &nbsp; 🌍 [Ko-Fi](https://ko-fi.com/logustra)<br>

## License
MIT License © 2022 Faizal Andyka