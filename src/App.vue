<script setup>
    import { ref } from "vue"
    import TvbirdModal from "./components/TvbirdModal.vue"
    import TmpForm from "@/components/TmpForm.vue"

    const modal = ref(false) // First Modal
    const customBackground = ref(false) // Second Modal
    const modal2 = ref(false) // Second Modal

    const onClose = () => {
        console.log("close")
    }

    setTimeout(() => {
        modal.value = false
    }, 1000)
</script>

<template>
    <div class="container mx-auto mt-16 px-4 lg:w-9/12 space-y-5">
        <h1 class="text-2xl font-light">Vue 3 Smooth Modal</h1>
        <ul class="p-8 bg-white rounded-md flex flex-col gap-x-10 gap-y-4 lg:flex-row">
            <li><a href="#" @click.prevent="modal = true">Simple modal</a></li>
            <li><a href="#" @click="customBackground = true">Custom background</a></li>
            <li><a href="#" @click="modal2 = true">Image modal</a></li>
        </ul>
    </div>

    <!--First Modal-->
    <TvbirdModal v-model="modal" @close="onClose">
        <TmpForm :short="true" class="modal" />
    </TvbirdModal>

    <!--Custom Background-->
    <TvbirdModal v-model="customBackground" style="--tvbird-modal-overlay: rgba(239, 192, 192, 0.35)">
        <TmpForm class="modal" />
    </TvbirdModal>

    <!--Image Modal Preload-->
    <TvbirdModal v-model="modal2" :close-on-esc="false" :duration="700" :is-image="true" @close="onClose">
        <img
            src="https://images.unsplash.com/photo-1524511498335-b0ed6b8e9a69?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2413&q=80"
            alt="woman"
            width="650"
        />
    </TvbirdModal>
</template>

<style lang="scss">
    body {
        font-family: "Open Sans", sans-serif;
        font-weight: 400;
        background-color: #f3f7ff;
    }

    .modal {
        min-width: 200px;
        max-width: 900px;
        padding: 30px;
        background-color: #fff;
        border-radius: 5px;
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
