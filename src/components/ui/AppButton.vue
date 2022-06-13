<template>
  <button 
    :disabled="disabled"
    @click="$emit('action')"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      required: false,
      default: false
    } 
  }
}
</script>