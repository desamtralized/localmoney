<script setup lang="ts">
import { Page, trackPage } from '~/analytics/analytics'

onMounted(() => {
  trackPage(Page.home)
})
</script>

<template>
  <main>
    <HomeHero />
    <Proposals />
  </main>
</template>

<style lang="scss">
@import '../style/pages.scss';
</style>
