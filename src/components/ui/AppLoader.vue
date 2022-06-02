<template>
  <div :class="'lds-ring-' + type">
    <div />
    <div />
    <div />
    <div />
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: false,
      default: 'bg'
    }
  }
}
</script>