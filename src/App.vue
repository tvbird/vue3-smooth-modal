<script setup>
    import { ref } from "vue"
    import TvbirdModal from "./components/TvbirdModal.vue"
    import TmpForm from "@/components/TmpForm.vue"

    const modal = ref(false) // First Modal
    const modal2 = ref(false) // Second Modal
    const modalVideo = ref(false) // Video Modal
    const customBackground = ref(false) // Second Modal
    const reCustomBackground = ref(null)

    const onClose = () => {
        console.log("close")
    }
</script>

<template>
    <div class="container mx-auto mt-16 px-4 lg:w-9/12 space-y-5">
        <h1 class="text-2xl font-light">Vue 3 Smooth Modal</h1>
        <ul class="p-8 bg-white rounded-md flex flex-col gap-x-10 gap-y-4 lg:flex-row font-medium">
            <li><a href="#" @click.prevent="modal = true">Simple modal</a></li>
            <li><a href="#" @click="modal2 = true">Image modal</a></li>
            <li><a href="#" @click="customBackground = true">Custom background</a></li>
            <li><a href="#" @click="modalVideo = true">Video modal</a></li>
        </ul>
    </div>

    <!--First Modal-->
    <TvbirdModal v-model="modal" @close="onClose">
        <TmpForm :short="true" class="modal" />
    </TvbirdModal>

    <!--Custom Background-->
    <TvbirdModal
        ref="reCustomBackground"
        v-model="customBackground"
        style="--tvbird-modal-overlay: rgb(239 192 222 / 25%)"
        @close="onClose"
    >
        <TmpForm class="modal">
            <div class="mt-3">
                <a href="#" class="a--blue font-medium text-sm" @click.prevent="reCustomBackground.close()">Close Modal</a>
            </div>
        </TmpForm>
    </TvbirdModal>

    <!--Image Modal Preload-->
    <TvbirdModal v-model="modal2" :close-on-esc="false" :duration="700" :is-image="true" @close="onClose">
        <img
            src="https://images.unsplash.com/photo-1524511498335-b0ed6b8e9a69?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2413&q=80"
            alt="woman"
            width="650"
        />
    </TvbirdModal>

    <!--Video Modal-->
    <TvbirdModal v-model="modalVideo" @close="onClose">
        <div class="aspect-video scale-75">
            <video controls autoplay>
                <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
            </video>
        </div>
    </TvbirdModal>
</template>

<style lang="scss">
    body {
        font-family: "Open Sans", sans-serif;
        font-weight: 400;
        background: linear-gradient(180deg, #f1f8ff, #fff);
        background-size: 100vw 100vh;
    }

    .modal {
        min-width: 200px;
        max-width: 900px;
        padding: 30px;
        background-color: #fff;
        border-radius: 5px;
    }

    .a--blue {
        color: #007bff;
    }

    a {
        color: #000;
        position: relative;
        padding-bottom: 4px;

        &::before {
            content: "";
            position: absolute;
            width: 100%;
            top: 0;
            bottom: 0;
            background-image: linear-gradient(90deg, #c3d6ff, #c3d6ff);
            background-size: 0 1px;
            background-repeat: no-repeat;
            background-position: left bottom;
            transition: background-size 0.3s ease-in;
        }

        &:hover::before {
            background-size: 100% 1px;
        }
    }
</style>
