<template>
  <div
    v-if="showModal"
    class="modal-backdrop"
    data-testid="modal-backdrop"
    @click="closeForm"
  >
    <div 
      tabindex="-1"
      ref="modalBody"
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

  watch: {
    modalVisibility(newVal) {
      this.showModal = newVal
    },

    showModal() {
      this.$nextTick(() => {
        this.showModal && this.$refs.modalBody.focus()
      })
    }
  },

  mounted() {
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