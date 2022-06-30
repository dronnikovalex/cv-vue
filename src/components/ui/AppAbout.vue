<template>
  <div 
    :class="`${source}__info`"
    data-cy="about" 
  >
    <div 
      :class="`${source}__personal`" 
      class="personal"
    >
      <span 
        :class="`${source}__surname`" 
        class="surname"
      >
        Дронников
      </span>
      <span 
        :class="`${source}__name`" 
        class="name"
      >
        Алексей
      </span>
    </div>
    <span :class="`${source}__position`">QA engineer</span>
  </div>
  
  <div
    v-if="about"
    :class="`${source}__summary`"
  >
    <h2 :class="`${source}__title`">Обо мне</h2>
    
    <p v-html="about" />
  </div>
</template>

<script>
export default {
  props: {
    source: {
      type: String,
      required: false,
      default: 'sidebar'
    },
    about: {
      type: String,
      required: false,
      default: ''
    }
  },

}
</script>