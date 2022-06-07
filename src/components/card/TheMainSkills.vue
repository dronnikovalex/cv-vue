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
        :class="banner"
        class="banner__item" 
        href="#" 
      />
    </div>

    <div class="skills__description">
      <div 
        v-for="(technology, idx) in stack"
        :key="idx"
        class="skills__item"
      >
        <h3>{{ technology.name }}</h3>
        <p>{{ technology.description }}</p>
      </div>
    </div>
  </section>
</template>

<script>
import AppHeading from '@/components/ui/AppHeading'

export default {
  components: { AppHeading },

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
    } 
  },

  mounted() {
    this.bannerClasses = Object.keys(this.stack)
      .map(item => this.stack[item].name.toLowerCase())
      .map(item => item.includes(',') ? item.split(',')[0] : item)
      .filter(item => item !== 'прочее')  
    }
}
</script>