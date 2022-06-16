<script setup>
    import { ref } from 'vue'
    import HelloWorld from './components/HelloWorld.vue'
    import TvbirdModal from './components/TvbirdModal.vue'

    const onClose = () => {
        console.log('close from parent')
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

        <div class="modal">
            ergerg rgsdfdf
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
