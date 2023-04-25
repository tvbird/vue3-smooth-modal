<script setup>
    import { ref, watch } from "vue"

    const emit = defineEmits(["opened", "closed"]) // События

    const props = defineProps({
        closeOnEsc: { type: Boolean, default: true }, // Закрытие по нажатию на Escape
        closeOnOverlay: { type: Boolean, default: true }, // Закрытие при клике на оверлей
        overlayBackground: { type: String, default: "rgba(0, 0, 0, .8)" } // Цвет заднего фона
    })

    const show = ref(false) // Текущее состояние
    const overlayShowing = ref(false) // Если показан оверлей

    const isClosed = ref(false) // Закрыто окно или нет (срабатывает до таймаута)
    const isCloseDelayed = ref(false) // Закрыто окно или нет (срабатывает через 50 мс после isClosed)

    // Показ модального окна
    const open = () => {
        show.value = true

        setTimeout(() => {
            overlayShowing.value = true
            emit("opened")
        }, 50)
    }

    // Закрытие окна
    const close = () => {
        isClosed.value = true

        setTimeout(() => (isCloseDelayed.value = true), 50)
        setTimeout(() => {
            overlayShowing.value = false
            isClosed.value = false
            isCloseDelayed.value = false
            show.value = false

            emit("closed")
        }, 700)
    }

    // Закрытие по клику на Overlay
    const closeOnOverlay = () => (props.closeOnOverlay ? close() : false)

    // Закрытие окна по Esc
    if (props.closeOnEsc) {
        const onEscape = (e) => (show.value && e.keyCode === 27 ? close() : false)

        watch(show, (val) => {
            if (val) document.addEventListener("keydown", onEscape)
            else document.removeEventListener("keydown", onEscape)
        })
    }

    // Экспорт
    defineExpose({
        open,
        close
    })
</script>

<template>
    <div
        v-if="show"
        class="tvbird-modal-overlay"
        :style="{ background: [props.overlayBackground] }"
        :class="{ 'tvbird-modal-overlay--show': overlayShowing, 'tvbird-modal-overlay--hide': isCloseDelayed }"
        @click="closeOnOverlay"
    >
        <div class="tvbird-modal-content">
            <div
                class="tvbird-modal-window"
                :class="{ 'tvbird-modal-window--show': overlayShowing, 'tvbird-modal-window--hide': isClosed }"
                @click.stop
            >
                <slot />
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    $time: 0.7s;
    $easing: ease;

    .tvbird-modal {
        &-window {
            box-sizing: border-box;

            transform: scale(0.6);
            opacity: 0;
            transition: all $time - 0.1s $easing;

            &--show {
                transform: scale(1);
                opacity: 1;
            }

            &--hide {
                opacity: 0;
                transform: scale(1.5);
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
