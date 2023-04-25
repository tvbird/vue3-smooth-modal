<script setup>
    import { ref } from "vue"
    import TvbirdModal from "./components/TvbirdModal.vue"

    const modal = ref(true) // First Modal
    const modal2 = ref(false) // Second Modal

    const onClose = () => {
        console.log("close")
    }

    setTimeout(() => {
        modal.value = false
    }, 1000)
</script>

<template>
    <div class="container mx-auto mt-16 px-4 lg:w-9/12">
        <div class="p-8 bg-white rounded-md">
            <div @click="modal = true">Открыть модальное окно</div>
            <div @click="modal2 = true">Открыть модальное окно 2</div>
        </div>
    </div>

    {{ modal }}

    <TvbirdModal
        v-model="modal"
        :close-on-esc="true"
        :close-on-overlay="true"
        overlay-background="rgba(0, 0, 0, .55)"
        @close="onClose"
    >
        <div class="modal">пдлв ыта лвыта ылтцщшутаыла дыдвалтт ывлдьылдв</div>
    </TvbirdModal>

    <TvbirdModal v-model="modal2" close-on-esc :duration="700" @close="onClose">
        <div>
            <img
                src="https://images.unsplash.com/photo-1524511498335-b0ed6b8e9a69?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2413&q=80"
                alt="woman"
                width="650"
            />
        </div>
    </TvbirdModal>
</template>

<style>
    .modal {
        min-width: 200px;
        padding: 30px;
        background-color: #fff;
    }

    body {
        font-family: "Roboto", sans-serif;
        font-weight: 400;
        background-color: #f3f7ff;
    }
</style>
