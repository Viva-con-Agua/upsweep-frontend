# vca-upsweep

[![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

> Implements comment section.

## Installation

```bash
npm install --save vca-upsweep
```

## Usage

### Bundler (Webpack, Rollup)

```js
import Vue from 'vue'
import { UpsweepView } from 'vca-upsweep'
import 'vca-upsweep/dist/vca-upsweep.css'

export default {
  name: 'App',
  components: { UpsweepView }
}

```

Inside your template:
```xml
<template>
  <div id="app">
    <UpsweepView></UpsweepView>
  </div>
</template>
```

## Development

### Launch visual tests

```bash
npm run serve
```

### Build

Bundle the js and css of to the `dist` folder:

```bash
npm run lib
```


## Publishing

The `prepublish` hook will ensure dist files are created before publishing. This
way you don't need to commit them in your repository.

```bash
# Bump the version first
# It'll also commit it and create a tag
npm version
# Push the bumped package and tags
git push --follow-tags
# Ship it 🚀
npm publish
```

## License
