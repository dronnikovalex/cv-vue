<template>
  <section class="skills">
    <app-heading>
      <span :class="titleClass">{{ titleName }}</span>
    </app-heading>
    
    <div 
      data-cy="skills-banner"
      class="skills__banner banner" 
    >
      <a
        v-for="(banner, idx) in bannerClasses"
        :key="idx"
        :class="banner.name"
        class="banner__item" 
        data-cy="banner-item"
        target="_blank"
        :href="banner.url" 
      />
    </div>

    <div
      v-if="stack.length"
      data-cy="skills-description"
      class="skills__description"
    >
      <main-skills-item
        v-for="(technology, idx) in stack"
        :key="idx"
        :technology="technology"
      />
    </div>
  </section>
</template>

<script>
import AppHeading from '@/components/ui/AppHeading'
import MainSkillsItem from './MainSkillsItem'

export default {
  components: { AppHeading, MainSkillsItem },

  props: {
    stack: {
      type: Array,
      required: true,
      default: function() {
        return []
      }
    },
    isShortTitle: {
      type: Boolean,
      required: true,
      default: false
    }
  },

  data() {
    return {
      bannerClasses: [],
    } 
  },

  computed: {
    titleClass() {
      return this.isShortTitle ? 'sm-size-title' : 'xl-size-title'
    },

    titleName() {
      return this.isShortTitle ? 'Навыки' : 'Профессиональные навыки'
    }
  },
  
  mounted() {
    if (this.stack.length) {
      this.bannerClasses = this.stack.map(item => ({
        name: item.name.toLowerCase(),
        url: item.url
      }))
      .filter(item => item.name !== 'прочее')  
    }
  },
}
</script>