<template>
  <aside class="sidebar about">
    <div class="about__avatar avatar" />
    <div class="about__info">
      <div class="about__personal personal">
        <span class="about__surname surname">Дронников</span>
        <span class="about__name name">Алексей</span>
      </div>
      <span class="about__position">QA engineer</span>
    </div>
    <div class="about__summary">
      <h2 class="sidebar__title">Обо мне</h2>
      
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, pariatur? Quas corporis libero quos eius, adipisci porro ea distinctio consequuntur! amet consectetur adipisicing elit. Reiciendis, pariatur? Quas corporis libero quos eius, adipisci porro ea distinctio consequuntur!</p>
    </div>

    <hr class="sidebar__divider">

    <div class="about__contacts contacts">
      <h2 class="sidebar__title">Контакты</h2>
      <!-- TODO: Add icons and styling to links -->
      <div class="contacts__item item">
        <span class="item__placeholder">
          Email
        </span>
        <span class="item__value">
          <a 
            href="mailto:@hoock57@gmail.com"
            target="_blank"
          >
            hoock57@gmail.com
          </a>
        </span>
      </div>
      <div class="contacts__item item">
        <span class="item__placeholder">
          Telegram
        </span>
        <span class="item__value">
          <a 
            href="https://telegram.me/aldronnikov"
            target="_blank"
          >
            t.me/aldronnikov
          </a>
        </span>
      </div>
      <div class="contacts__item item">
        <span class="item__placeholder">
          Телефон
        </span>
        <span class="item__value">
          <a 
            href="tel:+79534773162"
            target="_blank"
          >
            +7-(953)-477-31-62
          </a>
        </span>
      </div>
      <div class="contacts__item item">
        <button 
          href="#"
          class="contacts__request"
          @click.prevent="$emit('open-modal')"
        >
          <span class="text">
            Связаться
          </span>
        </button>
      </div>
    </div>

    <hr class="sidebar__divider">

    <div class="about__links links">
      <h2 class="sidebar__title">Ссылки</h2>

      <div class="link__item link">
        <span class="link__placeholder">
          Project repo
        </span>
        <span class="link__value">
          <font-awesome-icon :icon="[ 'fab', 'github' ]" />
          <a 
            href="https://github.com/dronnikovalex/cv-vue"
            target="_blank"
          >
            github.com/dronnikovalex/cv-vue
          </a>
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
          <a 
            href="https://github.com/dronnikovalex/cv-vue/cypress"
            target="_blank"
          >github.com/dronnikovalex/cv-vue/cypress</a>
        </span>
      </div>
      <div class="link__item">
        <span class="link__placeholder">
          Habr career
        </span>
        <span class="link__value">
          <font-awesome-icon :icon="[ 'fa', 'h-square' ]" />
          <a 
            href="https://career.habr.com/aleksey-dronnikov57"
            target="_blank"
          >
            habr.com/aleksey-dronnikov57
          </a>
        </span>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  emits: {
    'open-modal': null
  },
}
</script>
