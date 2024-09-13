<script setup>
    defineProps({
        short: { type: Boolean, default: false }
    })
</script>

<template>
    <div v-if="short" v-bind="$attrs">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil, ratione.</div>

    <div v-else v-bind="$attrs">
        <h3 class="text-2xl font-light">Lorem ipsum dolor</h3>
        <p class="mt-4">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum exercitationem laboriosam numquam omnis vitae. Consequatur
            dolores facere omnis reiciendis repellat!
        </p>
    </div>
</template>
