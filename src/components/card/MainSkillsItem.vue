<template>
  <div 
    class="skills__item"
    data-cy="skills-item"
  >
    <h3>{{ technologyName }}</h3>
    <p>{{ technology.description }}</p>
  </div>
</template>

<script>
export default {
  props: {
    technology: {
      type: Object,
      required: true,
      default: function() {
        return {
          name: 'Placeholder name',
          description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, debitis eos quia quibusdam aliquam tempora vel sequi sunt? Nemo, consequuntur?'
        } 
      }
    }
  },

  computed: {
    technologyName() {
      return this.technology.name === 'HTML' ? this.technology.name + ', CSS' : this.technology.name
    }
  }
}
</script>