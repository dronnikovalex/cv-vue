<template>
  <div class="links">
    <app-list-title v-if="isNotFooterSource">Ссылки</app-list-title>
    
    <links-list-item
      v-for="(link, idx) in links"
      :key="idx"
      :link="link"
    />
  </div>
</template>

<script>
import LinksListItem from './LinksListItem.vue'
import AppListTitle from '../ui/AppListTitle.vue'

export default {
  components: { LinksListItem, AppListTitle },

  props: {
    links: {
      type: Object,
      required: true,
      default: function() {
        return {}
      }
    },
    source: {
      type: String,
      required: false,
      default: 'footer',
    }
  },

  computed: {
    isNotFooterSource() {
      return this.source !== 'footer'
    }
  }
}
</script>