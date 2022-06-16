<script setup>
    import { ref, watch } from 'vue'

    const emit  = defineEmits(['onClose'])
    const props = defineProps({
        closeOnEsc: {type: Boolean, default: true},       // Закрытие по нажатию на Escape
        closeOnOverlay: {type: Boolean, default: true},  // Закрытие при клике на оверлей
    })

    const show = ref(false)             // Текущее состояние
    const overlayShowing = ref(false)   // Если показан оверлей

    // Показ модального окна
    const open = () => {
        show.value = true
        setTimeout(() => overlayShowing.value = true, 50)
    }

    // Закрытие окна
    const isClosed = ref(false)
    const close = () => {
        isClosed.value = true

        setTimeout(() => {
            overlayShowing.value = false
            isClosed.value = false
            show.value = false

            emit('onClose')
        }, 700)
    }

    // Закрытие по клику на Overlay
    const closeOnOverlay = () => (props.closeOnOverlay) ? close() : false

    // Закрытие окна по Esc
    if (props.closeOnEsc) {
        const onEscape = e => (show.value && e.keyCode === 27) ? close() : false

        watch(show, val => {
            if (val)
                document.addEventListener('keydown', onEscape)
            else
                document.removeEventListener('keydown', onEscape)
        })
    }

    // Экспорт
    defineExpose({
        open,
        close
    })
</script>



<template>
    <div class="tvbird-modal-overlay" @click="closeOnOverlay" v-if="show"
         :class="{'tvbird-modal-overlay--show': overlayShowing, 'tvbird-modal-overlay--hide': isClosed}">

        <div class="tvbird-modal-content">
            <div class="tvbird-modal-window" @click.stop
                 :class="{'tvbird-modal-window--show' : overlayShowing, 'tvbird-modal-window--hide': isClosed}">

                <slot />

            </div>
        </div>

    </div>

</template>

<style>
    :root {
        --tvbird-modal-overlay: rgba(0,0,0,.8);
    }
</style>


<style lang="scss">
    $time: .7s;
    $easing: ease;

    .tvbird-modal {
        &-window {
            box-sizing: border-box;

            transform: scale(.3);
            opacity: 0;
            transition: all $time - .1s $easing;

            &--show {
                transform: scale(1);
                opacity: 1;
            }

            &--hide {
                opacity: 0 !important;
                transform: scale(1.5) !important;
            }
        }

        &-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
            min-height: 100%;
        }

        &-overlay {
            -webkit-overflow-scrolling: touch;
            overscroll-behavior: contain;
            position: fixed;
            overflow-y: auto;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            background-color: var(--tvbird-modal-overlay);
            text-align: left;
            opacity: 0;
            transition: opacity $time $easing;

            &--show {
                opacity: 1;
            }

            &--hide {
                opacity: 0;
            }
        }
    }
</style>