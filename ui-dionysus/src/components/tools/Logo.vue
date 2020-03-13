<template>
  <div class="logo">
    <router-link :to="to">
      <img :src="`/tenant/${tenant}/logo.svg`"/>
      <h1 v-if="showTitle">{{ appName }}</h1>
    </router-link>
  </div>
</template>

<script>

export default {
  name: 'Logo',
  props: {
    tenant: {
      type: String,
      required: true
    },
    appName: {
      type: String,
      required: true
    },
    to: {
      type: Object,
      required: true
    },
    showTitle: {
      type: Boolean,
      default: true,
      required: false
    }
  }
}
</script>
