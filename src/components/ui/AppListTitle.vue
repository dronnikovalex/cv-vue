<template>
  <h2 
    v-if="$slots.default"
    class="sidebar__title"
    data-cy="title"
  >
    <slot />
  </h2>
</template>