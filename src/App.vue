<template>
  <div class="app-container">
    <the-sidebar />

    <main class="card-container">
      <the-social-header />
      
      <main-card>
        <main-skills />

        <main-experience />

        <main-education />
      </main-card>
    </main>
  </div>
</template>

<script>
import TheSidebar from '@/components/TheSidebar'

export default {
  components: { TheSidebar }
}
</script>