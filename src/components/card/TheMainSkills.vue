<template>
  <section class="skills">
    <app-heading>
      <span class="default-size-title">Профессиональные навыки</span>
      <span class="sm-size-title">Навыки</span>
    </app-heading>
    
    <div class="skills__banner banner">
      <a
        v-for="(banner, idx) in bannerClasses"
        :key="idx"
        :class="banner.name"
        class="banner__item" 
        target="_blank"
        :href="banner.url" 
      />
    </div>

    <div class="skills__description">
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
      type: Object,
      required: true,
      default: function() {
        return {}
      }
    }
  },

  data() {
    return {
      bannerClasses: [],
      orderedStack: [],
    } 
  },

  mounted() {
    this.bannerClasses = this.stack.map(item => ({
      name: item.name.toLowerCase(),
      url: item.url
    }))
    .filter(item => item.name !== 'прочее')  
  },
}
</script>