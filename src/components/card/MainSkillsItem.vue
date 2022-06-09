<template>
  <div class="skills__item">
    <h3>{{ technology.name === 'HTML' ? technology.name + ', CSS' : technology.name }}</h3>
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
  }
}
</script>