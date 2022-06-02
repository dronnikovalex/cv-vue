<template>
  <div 
    class="contacts"
  >
    <h2 
      v-if="!isHeaderSource"
      class="sidebar__title"
    >
      Контакты
    </h2>

    <div
      v-for="(contact, idx) in contacts"
      :key="idx"
      class="contacts__item item"
    >
      <span class="item__placeholder">
        {{ contact.name }}
      </span>
      <span class="item__value">
        <font-awesome-icon :icon="[ icons[contact.type]?.prefix, icons[contact.type]?.icon ]" />
        <a 
          :href="contact.link"
          target="_blank" 
        >
          {{ contact.value }}
        </a>  
      </span>
    </div>
    
    <div 
      v-if="!isHeaderSource"
      class="contacts__item item"
    >
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
import icons from '../../icons'

export default {
  props: {
    contacts: {
      type: Object,
      required: true,
      default: function() {
        return {}
      },
    },
    source: {
      type: String,
      required: false,
      default: 'header',
    }
  },

  data() {
    return {
      icons
    }
  },

  computed: {
    isHeaderSource() {
      return this.source === 'header'
    }
  }

}
</script>