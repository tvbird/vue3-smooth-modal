# Vue 3 Smooth Modal

Vue 3 Smooth Modal is a modal window package designed for Vue 3 that provides exceptionally smooth transitions for showing and hiding modals. Its focus is on delivering a seamless user experience, with fluid animations and effortless integration into any Vue 3 project. This package simplifies the process of managing modals, ensuring both visual appeal and high performance

## Demo
![ezgif-4-266f7aa836](https://github.com/user-attachments/assets/bb76ba40-d385-4399-bb8c-e33eae01690d)


## Installation
```
npm i vue-smooth-modal
```

## Setup
Add dependencies to your main.js:

```js
import { createApp } from 'vue'

import "vue-smooth-modal/dist/style.css"
import SmoothModal from "vue-smooth-modal"
// ...
app.use(SmoothModal)
```


## Usage

```vue
<script setup>
    import { ref } from 'vue'

    const show = ref(false)
    const reModal = ref(null)
    // reModal.value.close()

    const onClose = () => console.log("close")
</script>

<template>
    <SmoothModal v-model="show" ref="reModal" :use-skeleton="true" @close="onClose" class="custom-background">
        <p>
            This is an example of displaying text in a modal window
        </p>
    </SmoothModal>

    <a href="#" @click.prevent="show = true">Toggle</a>
</template>

<style>
    .custom-background {
        --tvbird-modal-overlay: rgb(239 192 222 / 25%);
    }
</style>
```

## Props

| Attribute      |  Type   |    Default    | Description                                                                |
|:---------------|:-------:|:-------------:|:---------------------------------------------------------------------------|
| duration       | Number  |      700      | show and hide duration                                                     |
| easing         | String  | `ease-in-out` | [easing](https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function) |                 
| showClose      | Boolean |    `true`     | Display the modal close icon                                               |
| closeOnEsc     | Boolean |    `true`     | Close the modal by pressing the Esc key                                    |
| closeOnOverlay | Boolean |    `true`     | Close the modal by clicking on the overlay                                 |
| isImage        | Boolean |    `false`    | Image inside. Image preloading with an SVG preloader                       |
| useSkeleton    | Boolean |    `false`    | Use a CSS template                                                         |

## Emits

| Event   | Description                               |
|:--------|:------------------------------------------|
| `close` | Triggered when the modal window is closed |    

## Slots

| slot name   | description         |
|:------------|:--------------------|
| `close`     | Custom close button |
| `preloader` | Custom preloader    |
