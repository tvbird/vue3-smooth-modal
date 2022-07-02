<script setup>
    import { ref } from 'vue'
    import HelloWorld from './components/HelloWorld.vue'
    import TvbirdModal from './components/TvbirdModal.vue'

    const onClose = () => {
        console.log('close from parent')
    }
    const onOpen = () => {
        console.log('open from parent')
    }

    const modal = ref(null)
    const openModal = () => modal.value.open()


    let modal2 = ref(null)
    const openModal2 = () => modal2.value.open()

</script>

<template>
    <HelloWorld msg="Hello Vue 3 + Vite" />
    <div @click="openModal">Открыть модальное окно</div>
    <div @click="openModal2">Открыть модальное окно 2</div>


    <TvbirdModal
            :close-on-esc="true"
            :close-on-overlay="true"
            @onClose="onClose"
            @onOpen="onOpen"
            ref="modal">

        <div class="modal">
            пдлв ыта лвыта ылтцщшутаыла дыдвалтт ывлдьылдв
        </div>

    </TvbirdModal>


    <TvbirdModal
            :close-on-esc="true"
            :close-on-overlay="true"
            @onClose="onClose"
            ref="modal2">

        <div>
            <img src="https://images.unsplash.com/photo-1524511498335-b0ed6b8e9a69?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2413&q=80" alt="woman" width="650">
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
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
    }
</style>
