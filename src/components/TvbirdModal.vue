<script setup>
    import { ref, watch, onMounted, nextTick } from "vue"

    const emit = defineEmits(["update:modelValue", "close"]) // События
    const props = defineProps({
        duration: { type: Number, default: 700 }, // Время анимации
        easing: { type: String, default: "ease" }, // Эффект анимации
        modelValue: { type: Boolean, default: false }, // Показывать или нет модальное окно
        closeOnEsc: { type: Boolean, default: true }, // Закрытие по нажатию на Escape
        closeOnOverlay: { type: Boolean, default: true }, // Закрытие при клике на оверлей
        isImage: { type: Boolean, default: false } // Это изображение?
    })

    let canUse = true
    let lastImg = ""

    let imgLoaded = ref(false)
    const model = ref(props.modelValue)
    const reOverlay = ref(null)
    const reModal = ref(null)

    const onEscape = (e) => (props.modelValue && e.keyCode === 27 ? close() : false)

    const durCalc = (value) => (value > 100 ? value - 100 : value)

    const close = (enableEmitOnClose = true) => {
        if (!canUse) return false

        canUse = false
        reOverlay.value.animate({ opacity: [1, 0] }, { duration: props.duration, easing: props.easing, fill: "backwards" })
        reModal.value.animate(
            { opacity: [1, 0], transform: ["scale(1.3)"] },
            { duration: durCalc(props.duration), easing: props.easing, fill: "backwards" }
        ).onfinish = () => {
            if (props.closeOnEsc) document.removeEventListener("keydown", onEscape)

            emit("update:modelValue", false)
            if (enableEmitOnClose) emit("close")

            model.value = false
            canUse = true
        }
    }

    const closeOverlay = () => {
        if (!canUse) return false

        if (props.closeOnOverlay) close()
    }

    const preloadImage = (url) => {
        return new Promise((resolve) => {
            const img = new Image()
            img.onload = () => resolve(url)
            img.src = url
            img.remove()
        })
    }

    const open = async () => {
        if (!canUse) return false

        canUse = false
        model.value = true
        reOverlay.value.animate({ opacity: [0, 1] }, { duration: props.duration, easing: props.easing, fill: "forwards" })

        if (props.isImage) {
            const img = reModal.value.querySelector("img")
            if (img && lastImg !== img.src) {
                await preloadImage(img.src)
                lastImg = img.src
                imgLoaded.value = true
            }
        }

        reModal.value.animate(
            { opacity: [0, 1], transform: ["scale(0.7)", "scale(1.0)"] },
            { duration: durCalc(props.duration), easing: props.easing, fill: "forwards" }
        ).onfinish = () => {
            if (props.closeOnEsc) document.addEventListener("keydown", onEscape)
            canUse = true
        }
    }

    watch(
        () => props.modelValue,
        async (val) => {
            if (!val) close(false)
            else await nextTick(open)
        }
    )

    onMounted(() => {
        if (!canUse) return false
        if (props.modelValue) open()
    })

    defineExpose({ close })
</script>

<template>
    <div v-show="model" v-if="modelValue" ref="reOverlay" class="tvbird-modal-overlay" @click="closeOverlay">
        <div class="tvbird-modal-content">
            <div ref="reModal" class="tvbird-modal-window" @click.stop>
                <slot />
            </div>

            <slot v-if="isImage && !imgLoaded" name="preloader">
                <div class="tvbird-modal-preloader">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                        <circle fill="none" stroke-opacity="1" stroke="#FFFFFF" stroke-width=".5" cx="100" cy="100" r="0">
                            <animate
                                attributeName="r"
                                calcMode="spline"
                                dur="2"
                                values="1;80"
                                keyTimes="0;1"
                                keySplines="0 .2 .5 1"
                                repeatCount="indefinite"
                            ></animate>
                            <animate
                                attributeName="stroke-width"
                                calcMode="spline"
                                dur="2"
                                values="0;25"
                                keyTimes="0;1"
                                keySplines="0 .2 .5 1"
                                repeatCount="indefinite"
                            ></animate>
                            <animate
                                attributeName="stroke-opacity"
                                calcMode="spline"
                                dur="2"
                                values="1;0"
                                keyTimes="0;1"
                                keySplines="0 .2 .5 1"
                                repeatCount="indefinite"
                            ></animate>
                        </circle>
                    </svg>
                </div>
            </slot>
        </div>
    </div>
</template>

<style lang="scss">
    :root {
        --tvbird-modal-overlay: rgba(0, 0, 0, 0.16);
    }

    .tvbird-modal {
        &-window {
            box-sizing: border-box;
            transform: scale(0.7);
            will-change: transform;
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
            background: var(--tvbird-modal-overlay);
        }

        &-preloader {
            position: fixed;
            width: 40px;
            height: 40px;
        }
    }
</style>
