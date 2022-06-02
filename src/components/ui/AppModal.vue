<template>
  <div
    v-if="modalVisibility"
    class="modal-backdrop"
    @click="closeForm"
  >
    <div 
      class="modal"
      @click.stop
    >
      <h3  
        class="modal__title"
      >
        Контактная информация
      </h3>
      <span 
        class="modal__close"
        @click="closeForm"
      >
        &times;
      </span>
      
      <slot />
    </div>
  </div> 
</template> 

<script>
export default {
  props: {
    modalVisibility: {
      type: Boolean,
      required: true,
      default: false,
    }
  },

  emits: {
    'send-form': null,
    'close-form': null,
  },

  methods: {
    closeForm() {
      this.$emit('close-form')
    }
  }
}
</script>