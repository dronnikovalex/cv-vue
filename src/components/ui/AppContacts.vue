<template>
  <div 
    class="contacts"
  >
    <h2 class="sidebar__title">Контакты</h2>
    <!-- TODO: Add icons and styling to links -->
    <div
      v-for="(contact, idx) in contacts"
      :key="idx"
      class="contacts__item item"
    >
      <span class="item__placeholder">
        {{ contact.type }}
      </span>
      <span class="item__value">
        <a 
          :href="contact.link"
          target="_blank"
        >
          {{ contact.value }}
        </a>
      </span>
    </div>
    
    <div class="contacts__item item">
      <button 
        href="#"
        class="contacts__request"
        @click.prevent="$emit('open-modal')"
      >
        <span class="text">
          Связаться
        </span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    contacts: {
      type: Object,
      required: true,
      default: function() {
        return {}
      }
    },
  }
}
</script>