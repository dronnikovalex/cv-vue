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
        v-for="(technology, idx) in orderedStack"
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
    this.bannerClasses = Object.keys(this.stack)
      .map(item => ({
        name: this.stack[item].name.toLowerCase(),
        url: this.stack[item].url
      }))
      .filter(item => item.name !== 'прочее')  

    for (const key in this.stack) {
      this.orderedStack.push(this.stack[key])
    }

    function swap(arr, a, b) {
      arr[a] = arr.splice(b, 1, arr[a])[0];
    }
    const postman = this.orderedStack.findIndex(stackItem => stackItem.name === 'Postman')
    const html = this.orderedStack.findIndex(stackItem => stackItem.name === 'HTML')
    const postgres = this.orderedStack.findIndex(stackItem => stackItem.name === 'PostgreSQL')
    const js = this.orderedStack.findIndex(stackItem => stackItem.name === 'JavaScript')

    swap(this.orderedStack, postman, html)
    swap(this.orderedStack, postgres, js)
  },
}
</script>