<template>
  <div
    v-if="showModal"
    class="modal-backdrop"
    data-testid="modal-backdrop"
    @click="closeForm"
  >
    <div 
      class="modal"
      data-testid="modal"
      @click.stop
      @keydown.esc="closeForm"
    >
      <h3
        class="modal__title"
      >
        Контактная информация
      </h3>
      <span 
        class="modal__close"
        data-testid="close-button"
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
    'close-form': null,
  },

  data() {
    return {
      showModal: false
    }
  },

  updated() {
    this.showModal = this.modalVisibility
  },

  methods: {
    closeForm() {
      this.showModal = false
      this.$emit('close-form')
    }
  },
}
</script>