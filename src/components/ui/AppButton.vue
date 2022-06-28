<template>
  <button 
    :disabled="disabled"
    @click="$emit('action')"
  >
    <slot>
      <span 
        class="text"
        data-cy="contact-me"
      >
        Связаться
      </span>
    </slot>
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
  },

  emits: {
    action: null
  }
}
</script>