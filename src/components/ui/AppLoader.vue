<template>
  <div 
    :class="['lds-ring-' + type, color]"
    data-testid="loader"
  >
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
    },
    color: {
      type: String,
      required: false,
      default: 'white'
    },
  }
}
</script>