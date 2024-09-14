# Vue 3 Smooth Modal

Vue 3 Smooth Modal is a modal window package designed for Vue 3 that provides exceptionally smooth transitions for showing and hiding modals. Its focus is on delivering a seamless user experience, with fluid animations and effortless integration into any Vue 3 project. This package simplifies the process of managing modals, ensuring both visual appeal and high performance


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

## Custom slots

| slot name   | description         |
|:------------|:--------------------|
| `close`     | Custom close button |
| `preloader` | Custom preloader    |