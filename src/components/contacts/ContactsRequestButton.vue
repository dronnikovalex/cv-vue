<template>
  <div class="request-button">
    <button 
      class="contacts__request"
      @click.prevent="$emit('open-modal')"
    >
      <span class="text">
        Связаться
      </span>
    </button>
  </div>
</template>

<script>
export default {
  emits: {
    'open-modal': null
  },
}
</script>