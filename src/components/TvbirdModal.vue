<script setup>
    import { ref, watch, onMounted, defineExpose } from "vue"

    const emit = defineEmits(["update:modelValue", "close"]) // События
    const props = defineProps({
        duration: { type: Number, default: 700 }, // Время анимации
        easing: { type: String, default: "ease" }, // Эффект анимации
        modelValue: { type: Boolean, default: false }, // Показывать или нет модальное окно
        closeOnEsc: { type: Boolean, default: true }, // Закрытие по нажатию на Escape
        closeOnOverlay: { type: Boolean, default: true }, // Закрытие при клике на оверлей
        overlayBackground: { type: String, default: "rgba(0, 0, 0, .8)" } // Цвет заднего фона
    })

    const reOverlay = ref(null)
    const reModal = ref(null)

    const onEscape = (e) => (props.modelValue && e.keyCode === 27 ? close() : false)

    const durCalc = (value) => (value > 100 ? value - 100 : value)
    const close = () => {
        reOverlay.value.animate({ opacity: [1, 0] }, { duration: props.duration, easing: props.easing, fill: "backwards" })
        reModal.value.animate(
            { opacity: [1, 0], transform: ["scale(1.5)"] },
            { duration: durCalc(props.duration), easing: props.easing, fill: "backwards" }
        ).onfinish = () => {
            if (props.closeOnEsc) document.removeEventListener("keydown", onEscape)

            emit("update:modelValue", false)
            emit("close")
        }
    }

    const closeOverlay = () => {
        if (props.closeOnOverlay) close()
    }

    const open = () => {
        reOverlay.value.animate({ opacity: [0, 1] }, { duration: props.duration, easing: props.easing, fill: "forwards" })
        reModal.value.animate(
            { opacity: [0, 1], transform: ["scale(0.7)", "scale(1.0)"] },
            { duration: durCalc(props.duration), easing: props.easing, fill: "forwards" }
        ).onfinish = () => {
            if (props.closeOnEsc) document.addEventListener("keydown", onEscape)
        }
    }

    watch(
        () => props.modelValue,
        (val) => {
            if (val) open()
            else close()
        }
    )

    onMounted(() => {
        if (props.modelValue) open()
    })

    defineExpose({ open, close })
</script>

<template>
    <div
        v-show="modelValue"
        ref="reOverlay"
        class="tvbird-modal-overlay"
        :style="{ background: [props.overlayBackground] }"
        @click="closeOverlay"
    >
        <div class="tvbird-modal-content">
            <div ref="reModal" class="tvbird-modal-window" @click.stop>
                <slot />
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .tvbird-modal {
        &-window {
            box-sizing: border-box;
            transform: scale(0.7);
            opacity: 0;
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
        }
    }
</style>
