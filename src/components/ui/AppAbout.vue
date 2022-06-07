<template>
  <div class="about__info">
    <div class="about__personal personal">
      <span class="about__surname surname">Дронников</span>
      <span class="about__name name">Алексей</span>
    </div>
    <span class="about__position">QA engineer</span>
  </div>
  <div class="about__summary">
    <h2 class="sidebar__title">Обо мне</h2>
    
    <p>
      <slot />
    </p>
  </div>
</template>

<script>
export default {
  props: {
    source: {
      type: String,
      required: false,
      default: 'sidebar'
    }
  },
}
</script>