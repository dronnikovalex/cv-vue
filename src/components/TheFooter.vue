<template>
  <footer class="footer"> 
    <div class="footer__links links">
      <div class="link__item">
        <span class="link__placeholder">
          Project repo
        </span>
        <span class="link__value">
          <font-awesome-icon :icon="[ 'fab', 'github' ]" /> <a href="https://github.com/dronnikovalex/cv-vue">github.com/dronnikovalex/cv-vue</a>
        </span>
      </div>
      <div class="link__item">
        <span class="link__placeholder">
          Cypress tests
        </span>
        <span class="link__value">
          <img 
            src="../images/cypress.png" 
            alt="cypress"
            class="cypress-icon"
          >
          <a href="https://github.com/dronnikovalex/cv-vue/cypress">github.com/dronnikovalex/cv-vue/cypress</a>
        </span>
      </div>
      <div class="link__item">
        <span class="link__placeholder">
          VK
        </span>
        <span class="link__value">
          <font-awesome-icon :icon="[ 'fab', 'vk' ]" /> <a href="https://vk.com/id38394670">vk.com/id38394670</a>
        </span>
      </div>
      <div class="link__item">
        <span class="link__placeholder">
          Habr
        </span>
        <span class="link__value">
          <font-awesome-icon :icon="[ 'fa', 'h-square' ]" /> <a href="https://career.habr.com/aleksey-dronnikov57">habr.com/aleksey-dronnikov57</a>
        </span>
      </div>
    </div>

    <div class="footer_contacts contacts">
      <div class="item">
        <a 
          href="#"
          class="contacts__request"
          @click.prevent="$emit('open-modal')"
        >
          <span class="text">
            Связаться
          </span>
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  emits: {
    'open-modal': null
  },
}
</script>
